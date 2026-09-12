import { basename, dirname, relative } from "node:path"
import { SECRET_SET } from "akasha/infrastructure/calls/infrastructure-calls.module.code.ts"
import { secretAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "create-tunnel"

const SOURCED = "deploy-functions"

const SHELL = "shell"

const SECRET = "secret"

const CREDS = "cloudflared-creds-credentials-json"

const SERVICE = "service-cluster"

const TUNNEL = "cloudflared"

const CONFIG = "config"

const UNDER = "${AKASHA_ROOT}/"

export function sourcedIn(given: string | Reading): string {
  return fileOf(given, valuedAt(given, SCRIPT, SOURCED), SCRIPT, SHELL)
}

export function credsPageIn(given: string | Reading): string {
  return valuedAt(given, SECRET, CREDS).path
}

export function credsHeldIn(given: string | Reading): string {
  const at = secretAt(credsPageIn(given))
  if (at === null) {
    throw new Error(`the \`${CREDS}\` page is no TypeScript file, so no sops file sits beside it`)
  }
  return at
}

export function tunnelConfigIn(given: string | Reading): string {
  return fileOf(given, valuedAt(given, SERVICE, TUNNEL), SERVICE, CONFIG)
}

export function bodyIn(given: string | Reading): string {
  const here = dirname(valuedAt(given, SCRIPT, OWN).path)
  const sourced = sourcedIn(given)
  const lines = [
    "#!/usr/bin/env bash",
    "",
    "set -euo pipefail",
    "",
    'AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"',
    "",
    `_DEPLOY_LIB_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/${relative(here, dirname(sourced))}" && pwd)"`,
    `# shellcheck source=${relative(here, sourced)} disable=SC1091`,
    `. "\${_DEPLOY_LIB_DIR}/${basename(sourced)}"`,
    "",
    "if [[ $# -lt 1 ]]; then",
    '  echo "Usage: $(basename "$0") <tunnel-name> [--force]"',
    '  echo ""',
    '  echo "Create a new Cloudflare Tunnel and generate K8s secret + configmap."',
    '  echo ""',
    '  echo "Options:"',
    '  echo "  --force    Overwrite the credentials the cloudflared-creds page already holds"',
    '  echo ""',
    '  echo "Prerequisites:"',
    '  echo "  - cloudflared CLI installed and authenticated (cert.pem in ~/.cloudflared/)"',
    '  echo "  - sops CLI installed"',
    '  echo "  - SOPS age key available (SOPS_AGE_KEY, SOPS_AGE_KEY_FILE, or ~/.config/sops/age/keys.txt)"',
    "  exit 1",
    "fi",
    "",
    'TUNNEL_NAME="$1"',
    "FORCE=false",
    'if [[ "${2:-}" == "--force" ]]; then',
    "  FORCE=true",
    "fi",
    "",
    'CLOUDFLARED_DIR="${CLOUDFLARED_DIR:-${HOME}/.cloudflared}"',
    `CREDS_PAGE="${credsPageIn(given)}"`,
    `CREDS_HELD="${UNDER}${credsHeldIn(given)}"`,
    `TUNNEL_CONFIG="${UNDER}${tunnelConfigIn(given)}"`,
    "",
    "if ! command -v cloudflared &>/dev/null; then",
    '  die "cloudflared not found — install from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"',
    "fi",
    "",
    "if ! command -v sops &>/dev/null; then",
    '  die "sops not found — install with: brew install sops or download from https://github.com/getsops/sops/releases"',
    "fi",
    "",
    'if [[ ! -f "${CLOUDFLARED_DIR}/cert.pem" ]]; then',
    '  die "No cert.pem found at ${CLOUDFLARED_DIR}/cert.pem — run: cloudflared tunnel login"',
    "fi",
    "",
    'if [[ -f "$CREDS_HELD" && "$FORCE" != true ]]; then',
    '  die "The cloudflared-creds page already holds credentials — use --force to overwrite"',
    "fi",
    "",
    'log "Creating Cloudflare Tunnel: ${TUNNEL_NAME}"',
    'tunnel_output="$(cloudflared tunnel create "$TUNNEL_NAME" 2>&1)"',
    'echo "$tunnel_output"',
    "",
    'tunnel_id="$(echo "$tunnel_output" | grep -Eo \'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\')"',
    'if [[ -z "$tunnel_id" ]]; then',
    '  die "Could not extract tunnel ID from cloudflared output"',
    "fi",
    "",
    'ok "Tunnel created: ${tunnel_id}"',
    "",
    'CREDS_FILE="${CLOUDFLARED_DIR}/${tunnel_id}.json"',
    'if [[ ! -f "$CREDS_FILE" ]]; then',
    '  die "Credentials file not found: ${CREDS_FILE}"',
    "fi",
    "",
    'log "Reading credentials from ${CREDS_FILE}"',
    'log "Putting the credentials into ${CREDS_PAGE}"',
    "# The value is piped in, so it is enciphered before it reaches disk and never",
    "# written anywhere in the clear. What names the Secret, its namespace, its type",
    "# and its labels is the workflow step placing the page, not this script.",
    `if ! printf '%s' "$(< "$CREDS_FILE")" | (cd "$AKASHA_ROOT" && akasha ${SECRET_SET} \\`,
    '  --file-path "$CREDS_PAGE" --key value \\',
    '  --message "put the ${TUNNEL_NAME} tunnel\'s credentials into the page holding them"); then',
    `  die "akasha ${SECRET_SET} refused the credentials — the tunnel is created but unheld"`,
    "fi",
    'ok "Credentials held by ${CREDS_PAGE}"',
    "",
    'log "Updating tunnel ID in ${TUNNEL_CONFIG}"',
    'sed -i "s|tunnel: .*|tunnel: ${tunnel_id}|" "$TUNNEL_CONFIG"',
    'ok "Tunnel config updated with tunnel ID: ${tunnel_id}"',
    "",
    'echo ""',
    'ok "================================================================"',
    "ok \"  Tunnel '${TUNNEL_NAME}' (${tunnel_id}) bootstrapped!\"",
    'ok "================================================================"',
    'echo ""',
    'log "Next steps:"',
    `echo "  1. The credentials are committed already — akasha ${SECRET_SET} landed them."`,
    "echo \"  2. Commit the tunnel id:  git add ${TUNNEL_CONFIG} && git commit -m 'Bootstrap cloudflared tunnel'\"",
    'echo "  3. Push:                  git push (CI will place the secret, apply the configmap and sync DNS)"',
  ]
  return `${lines.join("\n")}\n`
}
