#!/bin/bash

_cf_load_token() {
  if [ -n "${_cf_token:-}" ]; then return 0; fi

  local token_file="${HOME}/.cloudflare/api-token"
  if [ ! -f "$token_file" ]; then return 1; fi

  _cf_token="$(cat "$token_file")"
}

_cf_build_zone_cache() {
  [ -n "${_cf_token:-}" ] || die "_cf_build_zone_cache: _cf_token not set — call _cf_load_token first"

  if [ -n "${_cf_zone_cache:-}" ]; then return 0; fi

  local zones_json
  zones_json="$(curl -sf "https://api.cloudflare.com/client/v4/zones?per_page=50" \
    -H "Authorization: Bearer ${_cf_token}")"

  _cf_zone_cache="$(echo "$zones_json" | jq -r '.result[]? // empty | "\(.name)|\(.id)"')"
}

_cf_find_zone() {
  local hostname="${1:?Usage: _cf_find_zone <hostname>}"

  _cf_zone_id=""
  _cf_zone_name=""

  local best
  best="$(echo "$_cf_zone_cache" | awk -F'|' -v h="$hostname" '{
    zone = $1; gsub(/\./, "\\.", zone)
    if ((h == $1 || h ~ "\\." zone "$") && length($1) > maxlen) {
      maxlen = length($1); name = $1; id = $2
    }
  } END { if (name) print name "|" id }')"

  if [ -n "$best" ]; then
    _cf_zone_name="${best%%|*}"
    _cf_zone_id="${best#*|}"
  fi

  [ -n "$_cf_zone_id" ]
}

sync_tunnel_dns() {
  local configmap="${1:?Usage: sync_tunnel_dns <configmap_file> <tunnel_id>}"
  local tunnel_id="${2:?Usage: sync_tunnel_dns <configmap_file> <tunnel_id>}"

  if ! _cf_load_token; then
    warn "Cloudflare API token not found — skipping DNS sync"
    return 0
  fi
  _cf_build_zone_cache

  local hostnames
  hostnames="$(grep '^[[:space:]]*- hostname:' "$configmap" | awk '{print $3}')"

  local hostname zone_id record_exists
  while IFS= read -r hostname; do
    if ! _cf_find_zone "$hostname"; then
      warn "No Cloudflare zone found for $hostname — skipping"
      continue
    fi
    local zone_id="$_cf_zone_id"

    record_exists="$(curl -sf \
      "https://api.cloudflare.com/client/v4/zones/${zone_id}/dns_records?type=CNAME&name=${hostname}" \
      -H "Authorization: Bearer ${_cf_token}" \
      | jq '.result // [] | length')"

    if [ "$record_exists" != "0" ]; then
      log "  DNS OK: $hostname"
      continue
    fi

    log "  Creating CNAME: $hostname → ${tunnel_id}.cfargotunnel.com"
    curl -sf -X POST "https://api.cloudflare.com/client/v4/zones/${zone_id}/dns_records" \
      -H "Authorization: Bearer ${_cf_token}" \
      -H "Content-Type: application/json" \
      -d "{\"type\":\"CNAME\",\"name\":\"${hostname}\",\"content\":\"${tunnel_id}.cfargotunnel.com\",\"proxied\":true}" \
      > /dev/null
  done <<EOF
$hostnames
EOF

  local desired_count
  desired_count="$(printf '%s\n' "$hostnames" | grep -c . || true)"
  if [ "${desired_count:-0}" -eq 0 ]; then
    warn "Desired hostname set is empty — skipping CNAME prune (refusing to delete all tunnel routes)"
    return 0
  fi

  local tunnel_content="${tunnel_id}.cfargotunnel.com"
  local prune_cap=5
  local prune_candidates=""
  local prune_zone_id records prune_name prune_id
  while IFS='|' read -r _ prune_zone_id; do
    [ -n "$prune_zone_id" ] || continue
    records="$(curl -sf \
      "https://api.cloudflare.com/client/v4/zones/${prune_zone_id}/dns_records?type=CNAME&content=${tunnel_content}&per_page=100" \
      -H "Authorization: Bearer ${_cf_token}" \
      | jq -r '.result[]? // empty | "\(.name)\t\(.id)"')"
    [ -n "$records" ] || continue
    while IFS=$'\t' read -r prune_name prune_id; do
      [ -n "$prune_id" ] || continue
      if echo "$hostnames" | grep -Fxq "$prune_name"; then
        continue
      fi
      prune_candidates="${prune_candidates}${prune_zone_id}"$'\t'"${prune_id}"$'\t'"${prune_name}"$'\n'
    done <<INNER
$records
INNER
  done <<OUTER
$_cf_zone_cache
OUTER

  local prune_total
  prune_total="$(printf '%s' "$prune_candidates" | grep -c . || true)"
  if [ "${prune_total:-0}" -eq 0 ]; then
    return 0
  fi
  if [ "${prune_total}" -gt "${prune_cap}" ]; then
    warn "CNAME prune would remove ${prune_total} records (cap ${prune_cap}) — skipping for human review:"
    printf '%s' "$prune_candidates" | awk -F'\t' 'NF{print "    - " $3}' >&2
    warn "Re-run after confirming, or drop the routes in batches under the cap."
    return 0
  fi

  while IFS=$'\t' read -r prune_zone_id prune_id prune_name; do
    [ -n "$prune_id" ] || continue
    log "  Pruning stale CNAME: ${prune_name} (record ${prune_id})"
    curl -sf -X DELETE \
      "https://api.cloudflare.com/client/v4/zones/${prune_zone_id}/dns_records/${prune_id}" \
      -H "Authorization: Bearer ${_cf_token}" \
      > /dev/null
  done <<DELETE
$prune_candidates
DELETE
}

add_dns_a_record() {
  local hostname="${1:?Usage: add_dns_a_record <hostname> <ip>}"
  local ip="${2:?Usage: add_dns_a_record <hostname> <ip>}"

  if ! _cf_load_token; then
    warn "Cloudflare API token not found — skipping A record for $hostname"
    return 0
  fi
  _cf_build_zone_cache

  if ! _cf_find_zone "$hostname"; then
    warn "No Cloudflare zone found for $hostname — skipping A record"
    return 0
  fi
  local zone_id="$_cf_zone_id"

  local record_json
  record_json="$(curl -sf \
    "https://api.cloudflare.com/client/v4/zones/${zone_id}/dns_records?type=A&name=${hostname}" \
    -H "Authorization: Bearer ${_cf_token}")"

  local record_id current_ip
  record_id="$(echo "$record_json" | jq -r '.result[0].id // empty')"
  current_ip="$(echo "$record_json" | jq -r '.result[0].content // empty')"

  if [ -n "$record_id" ]; then
    if [ "$current_ip" = "$ip" ]; then
      log "  A record OK: $hostname → $ip"
      return 0
    fi
    log "  Updating A record: $hostname → $ip (was $current_ip)"
    curl -sf -X PUT \
      "https://api.cloudflare.com/client/v4/zones/${zone_id}/dns_records/${record_id}" \
      -H "Authorization: Bearer ${_cf_token}" \
      -H "Content-Type: application/json" \
      -d "{\"type\":\"A\",\"name\":\"${hostname}\",\"content\":\"${ip}\",\"proxied\":false}" \
      > /dev/null
  else
    log "  Creating A record: $hostname → $ip"
    curl -sf -X POST \
      "https://api.cloudflare.com/client/v4/zones/${zone_id}/dns_records" \
      -H "Authorization: Bearer ${_cf_token}" \
      -H "Content-Type: application/json" \
      -d "{\"type\":\"A\",\"name\":\"${hostname}\",\"content\":\"${ip}\",\"proxied\":false}" \
      > /dev/null
  fi
}
