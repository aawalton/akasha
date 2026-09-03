#!/usr/bin/env bash

set -euo pipefail

# shellcheck disable=SC2034  # Carried across from infra/scripts; nothing here reads it
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
CLUSTER_DIR="${AKASHA_ROOT}/infra"

_DEPLOY_LIB_DIR="${CLUSTER_DIR}/lib"
# shellcheck source=../../../../infra/lib/deploy-functions.sh disable=SC1091
. "${CLUSTER_DIR}/lib/deploy-functions.sh"

if [[ $# -lt 1 ]]; then
  echo "Usage: $(basename "$0") <tunnel-name> [--force]"
  echo ""
  echo "Create a new Cloudflare Tunnel and generate K8s secret + configmap."
  echo ""
  echo "Options:"
  echo "  --force    Overwrite existing cloudflared.k8s-secret.sops.yaml"
  echo ""
  echo "Prerequisites:"
  echo "  - cloudflared CLI installed and authenticated (cert.pem in ~/.cloudflared/)"
  echo "  - sops CLI installed"
  echo "  - SOPS age key available (SOPS_AGE_KEY, SOPS_AGE_KEY_FILE, or ~/.config/sops/age/keys.txt)"
  exit 1
fi

TUNNEL_NAME="$1"
FORCE=false
if [[ "${2:-}" == "--force" ]]; then
  FORCE=true
fi

CLOUDFLARED_DIR="${CLOUDFLARED_DIR:-${HOME}/.cloudflared}"
SOPS_SECRET="${AKASHA_ROOT}/akasha/service-system/cluster-services/pages/cloudflared/cloudflared.k8s-secret.sops.yaml"
TUNNEL_CONFIG="${AKASHA_ROOT}/akasha/service-system/cluster-services/pages/cloudflared/config-header.yaml"

if ! command -v cloudflared &>/dev/null; then
  die "cloudflared not found — install from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"
fi

if ! command -v sops &>/dev/null; then
  die "sops not found — install with: brew install sops or download from https://github.com/getsops/sops/releases"
fi

if [[ ! -f "${CLOUDFLARED_DIR}/cert.pem" ]]; then
  die "No cert.pem found at ${CLOUDFLARED_DIR}/cert.pem — run: cloudflared tunnel login"
fi

if [[ -f "$SOPS_SECRET" && "$FORCE" != true ]]; then
  die "Secret already exists at ${SOPS_SECRET} — use --force to overwrite"
fi

log "Creating Cloudflare Tunnel: ${TUNNEL_NAME}"
tunnel_output="$(cloudflared tunnel create "$TUNNEL_NAME" 2>&1)"
echo "$tunnel_output"

tunnel_id="$(echo "$tunnel_output" | grep -Eo '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')"
if [[ -z "$tunnel_id" ]]; then
  die "Could not extract tunnel ID from cloudflared output"
fi

ok "Tunnel created: ${tunnel_id}"

CREDS_FILE="${CLOUDFLARED_DIR}/${tunnel_id}.json"
if [[ ! -f "$CREDS_FILE" ]]; then
  die "Credentials file not found: ${CREDS_FILE}"
fi

log "Reading credentials from ${CREDS_FILE}"
if [[ "$(wc -l < "$CREDS_FILE")" -gt 1 ]]; then
  die "Credentials file contains multiple lines — cannot embed in YAML literal block safely"
fi
creds_json="$(< "$CREDS_FILE")"

PLAIN_SECRET="$(mktemp)"
trap 'rm -f "$PLAIN_SECRET"' EXIT

cat > "$PLAIN_SECRET" <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: cloudflared-creds
  namespace: infra
  labels:
    app.kubernetes.io/name: cloudflared
    app.kubernetes.io/instance: infra
    app.kubernetes.io/component: tunnel
    app.kubernetes.io/part-of: infra
    app.kubernetes.io/managed-by: deploy-script
type: Opaque
stringData:
  credentials.json: |
    ${creds_json}
EOF

log "Encrypting secret with SOPS → ${SOPS_SECRET}"
sops -e "$PLAIN_SECRET" > "$SOPS_SECRET"
ok "Encrypted secret written to ${SOPS_SECRET}"

log "Updating tunnel ID in ${TUNNEL_CONFIG}"
sed -i "s|tunnel: .*|tunnel: ${tunnel_id}|" "$TUNNEL_CONFIG"
ok "Tunnel config updated with tunnel ID: ${tunnel_id}"

echo ""
ok "================================================================"
ok "  Tunnel '${TUNNEL_NAME}' (${tunnel_id}) bootstrapped!"
ok "================================================================"
echo ""
log "Next steps:"
echo "  1. Review changes:  git diff akasha/service-system/cluster-services/pages/cloudflared/"
echo "  2. Commit:          git add akasha/service-system/cluster-services/pages/cloudflared/ && git commit -m 'Bootstrap cloudflared tunnel'"
echo "  3. Push:            git push (CI will apply secret + configmap + sync DNS)"
