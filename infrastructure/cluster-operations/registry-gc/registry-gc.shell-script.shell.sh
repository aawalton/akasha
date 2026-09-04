#!/usr/bin/env bash

set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"

_DEPLOY_LIB_DIR="${AKASHA_ROOT}/infrastructure/cluster-operations/deploy-functions"
# shellcheck source=../deploy-functions/deploy-functions.shell-script.shell.sh disable=SC1091
. "${_DEPLOY_LIB_DIR}/deploy-functions.shell-script.shell.sh"
# shellcheck disable=SC1091
. "${AKASHA_ROOT}/service-system/cluster-services/pages/registry/registry.conf"

REGISTRY_URL="${REGISTRY_URL:-https://${CONTAINER_REGISTRY}}"
RETAIN_COUNT="${RETAIN_COUNT:-10}"
REGISTRY_NS="${REGISTRY_NS:-registry}"
EXECUTE=false
FILTER_REPO=""

_curl() {
  curl -sk --max-time 30 "$@"
}

list_repos() {
  _curl "${REGISTRY_URL}/v2/_catalog" | jq -r '.repositories[]'
}

list_tags() {
  local repo="$1"
  local result
  result="$(_curl "${REGISTRY_URL}/v2/${repo}/tags/list")"
  echo "$result" | jq -r '.tags // [] | .[]' 2>/dev/null
}

get_digest() {
  local repo="$1" tag="$2"
  _curl -I \
    -H "Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.v2+json, application/vnd.docker.distribution.manifest.list.v2+json, application/vnd.oci.image.manifest.v1+json" \
    "${REGISTRY_URL}/v2/${repo}/manifests/${tag}" 2>/dev/null \
    | grep -i '^docker-content-digest:' \
    | awk '{print $2}' \
    | tr -d '\r'
}

get_created_timestamp() {
  local repo="$1" tag="$2"
  local manifest config_digest created

  manifest="$(_curl \
    -H "Accept: application/vnd.oci.image.manifest.v1+json, application/vnd.docker.distribution.manifest.v2+json" \
    "${REGISTRY_URL}/v2/${repo}/manifests/${tag}" 2>/dev/null)"

  config_digest="$(echo "$manifest" | jq -r '.config.digest // empty' 2>/dev/null)"

  if [[ -z "$config_digest" ]]; then
    local inner_digest
    inner_digest="$(echo "$manifest" | jq -r '.manifests[0].digest // empty' 2>/dev/null)"
    if [[ -n "$inner_digest" ]]; then
      manifest="$(_curl \
        -H "Accept: application/vnd.oci.image.manifest.v1+json, application/vnd.docker.distribution.manifest.v2+json" \
        "${REGISTRY_URL}/v2/${repo}/manifests/${inner_digest}" 2>/dev/null)"
      config_digest="$(echo "$manifest" | jq -r '.config.digest // empty' 2>/dev/null)"
    fi
  fi

  if [[ -z "$config_digest" ]]; then
    echo "0"
    return
  fi

  created="$(_curl "${REGISTRY_URL}/v2/${repo}/blobs/${config_digest}" 2>/dev/null \
    | jq -r '.created // empty' 2>/dev/null)"

  if [[ -z "$created" ]]; then
    echo "0"
    return
  fi

  date -d "$created" +%s 2>/dev/null || echo "0"
}

delete_manifest() {
  local repo="$1" digest="$2"
  local http_code
  http_code="$(_curl -o /dev/null -w '%{http_code}' -X DELETE \
    "${REGISTRY_URL}/v2/${repo}/manifests/${digest}")"
  if [[ "$http_code" == "202" || "$http_code" == "200" ]]; then
    return 0
  else
    warn "DELETE ${repo}@${digest} returned HTTP ${http_code}"
    return 1
  fi
}

is_prunable_tag() {
  local tag="$1"
  [[ "$tag" =~ ^([a-z0-9-]+-)?[0-9a-f]{7,12}$ ]]
}

tag_family() {
  local tag="$1"
  if [[ "$tag" == *-* ]]; then
    echo "${tag%-*}"
  else
    echo ""
  fi
}

plan_repo() {
  local repo="$1"
  local tag fam ts rows=""
  while IFS= read -r tag; do
    [[ -z "$tag" ]] && continue
    is_prunable_tag "$tag" || continue
    fam="$(tag_family "$tag")"
    ts="$(get_created_timestamp "$repo" "$tag")"
    rows+="${fam}"$'\t'"${ts}"$'\t'"${tag}"$'\n'
  done < <(list_tags "$repo")
  [[ -z "$rows" ]] && return 0
  printf '%s' "$rows" | sort -t$'\t' -k1,1 -k2,2nr | awk -F'\t' -v k="$RETAIN_COUNT" '
    NF>=3 {
      c[$1]++
      action = (c[$1] <= k) ? "KEEP" : "DELETE"
      print action "\t" $2 "\t" $3
    }'
}

cmd_stats() {
  log "Registry: ${REGISTRY_URL}"
  log "Fetching repo list..."
  local total_tags=0 total_build=0 total_protected=0 total_repos=0

  printf "\n%-45s %8s %8s %8s\n" "REPOSITORY" "TOTAL" "BUILD" "PROTECTED"
  printf "%-45s %8s %8s %8s\n" "----------" "-----" "-----" "---------"

  while IFS= read -r repo; do
    [[ -z "$repo" ]] && continue
    total_repos=$((total_repos + 1))

    local build_count=0 protected_count=0 tag_count=0
    while IFS= read -r tag; do
      [[ -z "$tag" ]] && continue
      tag_count=$((tag_count + 1))
      if is_prunable_tag "$tag"; then
        build_count=$((build_count + 1))
      else
        protected_count=$((protected_count + 1))
      fi
    done < <(list_tags "$repo")

    printf "%-45s %8d %8d %8d\n" "$repo" "$tag_count" "$build_count" "$protected_count"
    total_tags=$((total_tags + tag_count))
    total_build=$((total_build + build_count))
    total_protected=$((total_protected + protected_count))
  done < <(list_repos)

  printf "%-45s %8s %8s %8s\n" "----------" "-----" "-----" "---------"
  printf "%-45s %8d %8d %8d\n" "TOTAL (${total_repos} repos)" "$total_tags" "$total_build" "$total_protected"

  echo ""
  log "Disk usage (registry pod):"
  local pod
  pod="$(kubectl -n "$REGISTRY_NS" get pods -l app.kubernetes.io/name=registry -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)"
  if [[ -n "$pod" ]]; then
    kubectl -n "$REGISTRY_NS" exec "$pod" -- du -sh /var/lib/registry 2>/dev/null || warn "Could not read disk usage"
  else
    warn "Registry pod not found"
  fi
}

cmd_list() {
  log "Registry: ${REGISTRY_URL}"
  log "Retention: keep ${RETAIN_COUNT} most recent build tags per prefix family"
  log "Fetching repo list..."

  local repos_to_process
  if [[ -n "$FILTER_REPO" ]]; then
    repos_to_process="$FILTER_REPO"
  else
    repos_to_process="$(list_repos)"
  fi

  local total_delete=0

  while IFS= read -r repo; do
    [[ -z "$repo" ]] && continue

    local plan
    plan="$(plan_repo "$repo")"
    [[ -z "$plan" ]] && continue

    local delete_count
    delete_count="$(printf '%s\n' "$plan" | grep -c '^DELETE' || true)"
    [[ "$delete_count" -eq 0 ]] && continue

    echo ""
    log "Repository: ${repo}"

    local action ts tag
    while IFS=$'\t' read -r action ts tag; do
      [[ -z "$tag" ]] && continue
      printf "    %-6s %s  (created: %s)\n" "$action" "$tag" \
        "$(date -d "@${ts}" -Iseconds 2>/dev/null || echo 'unknown')"
    done <<< "$plan"

    log "  Would delete: ${delete_count} tags"
    total_delete=$((total_delete + delete_count))
  done <<< "$repos_to_process"

  echo ""
  log "Total tags to delete: ${total_delete}"
}

cmd_prune() {
  if [[ "$EXECUTE" != true ]]; then
    log "DRY RUN — pass --execute to actually delete tags"
    cmd_list
    return
  fi

  log "Registry: ${REGISTRY_URL}"
  log "Retention: keep ${RETAIN_COUNT} most recent build tags per prefix family"
  log "Mode: EXECUTE — tags will be deleted"
  echo ""

  local pod
  pod="$(kubectl -n "$REGISTRY_NS" get pods -l app.kubernetes.io/name=registry -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)"
  if [[ -n "$pod" ]]; then
    log "Pre-cleanup disk usage:"
    kubectl -n "$REGISTRY_NS" exec "$pod" -- du -sh /var/lib/registry 2>/dev/null || true
    echo ""
  fi

  local total_deleted=0 total_failed=0 total_repos_pruned=0

  while IFS= read -r repo; do
    [[ -z "$repo" ]] && continue

    local plan
    plan="$(plan_repo "$repo")"
    [[ -z "$plan" ]] && continue

    local del_tags
    del_tags="$(printf '%s\n' "$plan" | awk -F'\t' '$1=="DELETE"{print $3}')"
    [[ -z "$del_tags" ]] && continue

    total_repos_pruned=$((total_repos_pruned + 1))
    local del_n
    del_n="$(printf '%s\n' "$del_tags" | grep -c . || true)"
    log "Pruning: ${repo} (deleting ${del_n} tag(s) beyond ${RETAIN_COUNT}/family)"

    local repo_deleted=0 repo_failed=0 digests=""
    local tag digest
    while IFS= read -r tag; do
      [[ -z "$tag" ]] && continue
      digest="$(get_digest "$repo" "$tag")"
      if [[ -z "$digest" ]]; then
        warn "  Could not get digest for ${repo}:${tag}, skipping"
        repo_failed=$((repo_failed + 1))
        continue
      fi
      digests+="${digest}"$'\n'
    done <<< "$del_tags"

    local uniq_digests
    uniq_digests="$(printf '%s' "$digests" | awk 'NF' | sort -u)"
    while IFS= read -r digest; do
      [[ -z "$digest" ]] && continue
      if delete_manifest "$repo" "$digest"; then
        repo_deleted=$((repo_deleted + 1))
      else
        repo_failed=$((repo_failed + 1))
      fi
    done <<< "$uniq_digests"

    log "  Deleted: ${repo_deleted}, Failed: ${repo_failed}"
    total_deleted=$((total_deleted + repo_deleted))
    total_failed=$((total_failed + repo_failed))
  done < <(list_repos)

  echo ""
  log "Tag cleanup complete: ${total_deleted} deleted, ${total_failed} failed across ${total_repos_pruned} repos"

  if [[ $total_deleted -gt 0 ]]; then
    echo ""
    log "Running garbage collection..."
    if [[ -n "$pod" ]]; then
      kubectl -n "$REGISTRY_NS" exec "$pod" -- \
        registry garbage-collect /etc/distribution/config.yml --delete-untagged 2>&1 \
        | tail -5
      ok "Garbage collection complete"

      echo ""
      log "Post-cleanup disk usage:"
      kubectl -n "$REGISTRY_NS" exec "$pod" -- du -sh /var/lib/registry 2>/dev/null || true
    else
      warn "Registry pod not found — run GC manually:"
      warn "  kubectl -n ${REGISTRY_NS} exec deploy/registry -- registry garbage-collect /etc/distribution/config.yml --delete-untagged"
    fi
  else
    log "No tags deleted — skipping GC"
  fi
}

usage() {
  echo "Usage: $(basename "$0") <subcommand> [options]"
  echo ""
  echo "Subcommands:"
  echo "  stats              Per-repo tag counts and disk usage"
  echo "  list   [--repo X]  Show what would be pruned (dry-run)"
  echo "  prune  [--execute] Delete old tags and run GC"
  echo ""
  echo "Options:"
  echo "  --execute          Actually delete (prune is dry-run by default)"
  echo "  --repo <name>      Filter to a single repo (list only)"
  echo ""
  echo "Environment:"
  echo "  REGISTRY_URL       Registry endpoint (default: https://registry.registry.svc.cluster.local:5000)"
  echo "  RETAIN_COUNT       SHA tags to keep per repo (default: 10)"
  echo "  REGISTRY_NS        K8s namespace (default: registry)"
  exit 1
}

[[ $# -ge 1 ]] || usage
SUBCOMMAND="$1"; shift

while [[ $# -gt 0 ]]; do
  case "$1" in
    --execute) EXECUTE=true; shift ;;
    --repo) FILTER_REPO="$2"; shift 2 ;;
    *) die "Unknown option: $1" ;;
  esac
done

case "$SUBCOMMAND" in
  stats) cmd_stats ;;
  list)  cmd_list ;;
  prune) cmd_prune ;;
  *)     usage ;;
esac
