#!/usr/bin/env bash

set -euo pipefail

# shellcheck disable=SC2034  # Carried across from infra/scripts; nothing here reads it
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
CLUSTER_DIR="${AKASHA_ROOT}/infra"

_DEPLOY_LIB_DIR="${CLUSTER_DIR}/lib"
# shellcheck source=../../../../infra/lib/deploy-functions.sh disable=SC1091
. "${CLUSTER_DIR}/lib/deploy-functions.sh"

TOKEN_DIR="${HOME}/.cloudflare"
TOKEN_FILE="${TOKEN_DIR}/api-token"

usage() {
  echo "Usage: $(basename "$0") <subcommand>"
  echo ""
  echo "Subcommands:"
  echo "  store     Read token from stdin or prompt, write to ${TOKEN_FILE}"
  echo "  verify    Test the stored token against the Cloudflare API"
  echo "  rotate    Print runbook for Dashboard token creation, then store + verify"
  echo "  status    Check if token file exists and test validity"
  exit 1
}

cmd_store() {
  mkdir -p "$TOKEN_DIR"

  local token=""
  if [[ ! -t 0 ]]; then
    read -r token
  else
    read -rsp "Enter Cloudflare API token: " token
    echo ""
  fi

  [[ -n "$token" ]] || die "No token provided"

  echo -n "$token" > "$TOKEN_FILE"
  chmod 600 "$TOKEN_FILE"
  ok "Token written to $TOKEN_FILE"
}

cmd_verify() {
  [[ -f "$TOKEN_FILE" ]] || die "No token file at $TOKEN_FILE — run 'store' first"

  local token
  token="$(< "$TOKEN_FILE")"
  token="${token%$'\n'}"

  log "Verifying Cloudflare API token..."
  local response http_code
  response="$(curl -s -w "\n%{http_code}" \
    "https://api.cloudflare.com/client/v4/user/tokens/verify" \
    -H "Authorization: Bearer ${token}")"
  http_code="$(echo "$response" | tail -1)"
  local body
  body="$(echo "$response" | sed '$d')"

  if [[ "$http_code" =~ ^2 ]]; then
    local success
    success="$(echo "$body" | jq -r '.success // false')"
    if [[ "$success" == "true" ]]; then
      ok "Token is valid"
      return 0
    fi
  fi

  warn "Token verification failed (HTTP $http_code)"
  echo "$body" | jq -r '.errors[]?.message // empty' 2>/dev/null || true
  return 1
}

cmd_rotate() {
  echo ""
  log "=== Cloudflare API Token Rotation Runbook ==="
  echo ""
  echo "  1. Log in to https://dash.cloudflare.com/profile/api-tokens"
  echo "  2. Find the existing token (or click 'Create Token')"
  echo "  3. Use the 'Edit zone DNS' template or create a custom token with:"
  echo "     - Permissions: Zone > DNS > Edit"
  echo "     - Zone Resources: Include > All Zones (or specific zones)"
  echo "  4. Click 'Continue to summary' > 'Create Token'"
  echo "  5. Copy the token value"
  echo ""
  log "Now storing the new token..."
  echo ""

  cmd_store
  cmd_verify
}

cmd_status() {
  echo ""
  log "=== Cloudflare Token Status ==="
  echo ""

  if [[ -f "$TOKEN_FILE" ]]; then
    ok "Token file exists: $TOKEN_FILE"
    cmd_verify || true
  else
    warn "No token file at $TOKEN_FILE"
  fi

  echo ""
}

case "${1:-}" in
  store)   cmd_store ;;
  verify)  cmd_verify ;;
  rotate)  cmd_rotate ;;
  status)  cmd_status ;;
  *)       usage ;;
esac
