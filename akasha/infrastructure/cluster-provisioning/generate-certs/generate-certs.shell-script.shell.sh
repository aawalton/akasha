#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
PKG_DIR="${AKASHA_ROOT}/infra"
CERTS_DIR="${SCRIPT_DIR}"
cd "$CERTS_DIR"

_DEPLOY_LIB_DIR="${PKG_DIR}/lib"
# the shared deploy functions are still outside akasha, so shellcheck is told not to follow
# shellcheck source=/dev/null
. "${_DEPLOY_LIB_DIR}/deploy-functions.sh"

FORCE=false
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
    *) die "Unknown option: $arg" ;;
  esac
done

CA_DAYS=3650
CERT_DAYS=3650
CERT_MIN_REMAINING=$((30 * 86400))
CA_SUBJECT="/CN=cluster-ca"
PGBOUNCER_SUBJECT="/CN=pgbouncer.pgbouncer.svc.cluster.local"

NODES_FILE="${AKASHA_ROOT}/akasha/infrastructure/cluster-operations/nodes.json"
[[ -f "$NODES_FILE" ]] || die "nodes.json not found: $NODES_FILE"

PGB_SAN_DNS=(
  "DNS.1:pgbouncer.pgbouncer.svc.cluster.local"
  "DNS.2:localhost"
)

PGB_SAN_IP=(
  "IP.1:127.0.0.1"
)

pgb_ip_idx=2
while IFS= read -r node_id; do
  node_ip="$(node_field "$node_id" host)"
  PGB_SAN_IP+=("IP.${pgb_ip_idx}:${node_ip}")
  log "Including ${node_id} (${node_ip}) in PgBouncer SAN entries"
  ((pgb_ip_idx++))
done < <(jq -r '.[].id' "$NODES_FILE")

pgbouncer_cert_is_valid() {
  [[ -f "${CERTS_DIR}/pgbouncer.crt" && -f "${CERTS_DIR}/pgbouncer.key" && -f "${CERTS_DIR}/ca.crt" ]] || return 1

  if ! openssl x509 -in "${CERTS_DIR}/pgbouncer.crt" -checkend "$CERT_MIN_REMAINING" -noout 2>/dev/null; then
    log "PgBouncer cert expires within 30 days — will regenerate"
    return 1
  fi

  if ! openssl verify -CAfile "${CERTS_DIR}/ca.crt" "${CERTS_DIR}/pgbouncer.crt" >/dev/null 2>&1; then
    log "PgBouncer cert fails CA verification — will regenerate"
    return 1
  fi

  local cert_sans
  cert_sans="$(openssl x509 -in "${CERTS_DIR}/pgbouncer.crt" -noout -ext subjectAltName 2>/dev/null || true)"

  while IFS= read -r node_id; do
    local node_ip
    node_ip="$(node_field "$node_id" host)"
    if ! echo "$cert_sans" | grep -q "$node_ip"; then
      log "PgBouncer cert missing ${node_id} IP ($node_ip) in SANs — will regenerate"
      return 1
    fi
  done < <(jq -r '.[].id' "$NODES_FILE")

  return 0
}

if [[ -f ca.crt && -f ca.key ]]; then
  log "CA already exists — skipping generation"
else
  log "Generating self-signed CA (valid ${CA_DAYS} days)"
  openssl genrsa -out ca.key 4096
  openssl req -x509 -new -nodes \
    -key ca.key \
    -sha256 \
    -days "$CA_DAYS" \
    -subj "$CA_SUBJECT" \
    -out ca.crt
  rm -f ca.srl
  ok "CA created: ca.crt, ca.key"
fi

PGB_CNF_FILE="pgbouncer-openssl.cnf"

{
  cat <<'STATIC'
[req]
req_extensions = v3_req
distinguished_name = req_dn
prompt = no

[req_dn]
CN = pgbouncer.pgbouncer.svc.cluster.local

[v3_req]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
STATIC

  for entry in "${PGB_SAN_DNS[@]}"; do
    key="${entry%%:*}"
    val="${entry#*:}"
    echo "${key} = ${val}"
  done

  for entry in "${PGB_SAN_IP[@]}"; do
    key="${entry%%:*}"
    val="${entry#*:}"
    echo "${key} = ${val}"
  done
} > "$PGB_CNF_FILE"

if [[ "$FORCE" != true ]] && pgbouncer_cert_is_valid; then
  ok "PgBouncer certificate is valid — skipping generation (use --force to override)"
else
  log "Generating PgBouncer server certificate"

  openssl genrsa -out pgbouncer.key 4096

  openssl req -new -nodes \
    -key pgbouncer.key \
    -subj "$PGBOUNCER_SUBJECT" \
    -config "$PGB_CNF_FILE" \
    -out pgbouncer.csr

  openssl x509 -req \
    -in pgbouncer.csr \
    -CA ca.crt \
    -CAkey ca.key \
    -CAcreateserial \
    -out pgbouncer.crt \
    -days "$CERT_DAYS" \
    -sha256 \
    -extensions v3_req \
    -extfile "$PGB_CNF_FILE"

  ok "PgBouncer certificate created: pgbouncer.crt, pgbouncer.key"

  log "Verifying PgBouncer certificate against CA"
  openssl verify -CAfile ca.crt pgbouncer.crt

  log "SAN entries in pgbouncer.crt:"
  openssl x509 -in pgbouncer.crt -noout -ext subjectAltName
fi

log "Cleaning up temporary files"
rm -f pgbouncer.csr "$PGB_CNF_FILE"

ok "Certificate generation complete"
ok "Files: ca.crt, ca.key, pgbouncer.crt, pgbouncer.key"
