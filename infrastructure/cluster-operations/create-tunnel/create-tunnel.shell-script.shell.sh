#!/usr/bin/env bash

set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"

_DEPLOY_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../deploy-functions" && pwd)"
# shellcheck source=../deploy-functions/deploy-functions.shell-script.shell.sh disable=SC1091
. "${_DEPLOY_LIB_DIR}/deploy-functions.shell-script.shell.sh"

if [[ $# -lt 1 ]]; then
  echo "Usage: $(basename "$0") <tunnel-name> [--force]"
  echo ""
  echo "Create a new Cloudflare Tunnel and generate K8s secret + configmap."
  echo ""
  echo "Options:"
  echo "  --force    Overwrite the credentials the cloudflared-creds page already holds"
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
CREDS_PAGE="service-system/secrets/pages/cloudflared-creds-credentials-json.secret.ts"
CREDS_HELD="${AKASHA_ROOT}/service-system/secrets/pages/cloudflared-creds-credentials-json.secret.sops.yaml"
TUNNEL_CONFIG="${AKASHA_ROOT}/service-system/cluster-services/pages/cloudflared/cloudflared.cluster-service.config.yaml"

if ! command -v cloudflared &>/dev/null; then
  die "cloudflared not found — install from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"
fi

if ! command -v sops &>/dev/null; then
  die "sops not found — install with: brew install sops or download from https://github.com/getsops/sops/releases"
fi

if [[ ! -f "${CLOUDFLARED_DIR}/cert.pem" ]]; then
  die "No cert.pem found at ${CLOUDFLARED_DIR}/cert.pem — run: cloudflared tunnel login"
fi

if [[ -f "$CREDS_HELD" && "$FORCE" != true ]]; then
  die "The cloudflared-creds page already holds credentials — use --force to overwrite"
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
log "Putting the credentials into ${CREDS_PAGE}"
# The value is piped in, so it is enciphered before it reaches disk and never
# written anywhere in the clear. What names the Secret, its namespace, its type
# and its labels is the workflow step placing the page, not this script.
if ! printf '%s' "$(< "$CREDS_FILE")" | (cd "$AKASHA_ROOT" && akasha page-secret-set \
  --file-path "$CREDS_PAGE" --key value \
  --message "put the ${TUNNEL_NAME} tunnel's credentials into the page holding them"); then
  die "akasha page-secret-set refused the credentials — the tunnel is created but unheld"
fi
ok "Credentials held by ${CREDS_PAGE}"

log "Updating tunnel ID in ${TUNNEL_CONFIG}"
sed -i "s|tunnel: .*|tunnel: ${tunnel_id}|" "$TUNNEL_CONFIG"
ok "Tunnel config updated with tunnel ID: ${tunnel_id}"

echo ""
ok "================================================================"
ok "  Tunnel '${TUNNEL_NAME}' (${tunnel_id}) bootstrapped!"
ok "================================================================"
echo ""
log "Next steps:"
echo "  1. The credentials are committed already — page-secret-set landed them."
echo "  2. Commit the tunnel id:  git add ${TUNNEL_CONFIG} && git commit -m 'Bootstrap cloudflared tunnel'"
echo "  3. Push:                  git push (CI will place the secret, apply the configmap and sync DNS)"
