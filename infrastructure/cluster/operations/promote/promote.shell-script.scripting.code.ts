import {
  folderOf,
  relativeBetween,
} from "akasha/code/code-path-between/code-path-between.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "promote"

const READ_IN = "deploy-functions"

const SHELL = "shell"

const APART = "/"

function readsIn(given: string | Reading): string {
  const own = valuedAt(given, SCRIPT, OWN)
  const held = valuedAt(given, SCRIPT, READ_IN)
  return relativeBetween(folderOf(own.path), fileOf(given, held, SCRIPT, SHELL))
}

export function bodyIn(given: string | Reading): string {
  const at = readsIn(given)
  const folder = folderOf(at)
  const named = at.slice(folder.length + APART.length)
  const lines = [
    "#!/usr/bin/env bash",
    "",
    "set -euo pipefail",
    "",
    `_DEPLOY_LIB_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/${folder}" && pwd)"`,
    `# shellcheck source=${at} disable=SC1091`,
    `. "\${_DEPLOY_LIB_DIR}/${named}"`,
    "",
    'PACKAGE="${1:-}"',
    'TAG="${2:-}"',
    "",
    'if [[ -z "$PACKAGE" ]]; then',
    '  die "Usage: $(basename "$0") <package> [image-tag]"',
    "fi",
    "",
    'CURRENT_IMAGE=$(kubectl get deployment nextjs -n "$PACKAGE" \\',
    "  -o jsonpath='{.spec.template.spec.containers[?(@.name==\"nextjs\")].image}' 2>/dev/null) || true",
    "",
    'if [[ -z "$CURRENT_IMAGE" ]]; then',
    '  if [[ -n "$TAG" ]]; then',
    "    die \"No 'nextjs' deployment found in namespace '$PACKAGE'\"",
    "  else",
    "    die \"No 'nextjs' deployment found in namespace '$PACKAGE' — cannot determine image base. Pass an explicit image: $(basename \"$0\") $PACKAGE <image-tag>\"",
    "  fi",
    "fi",
    "",
    'IMAGE_BASE="${CURRENT_IMAGE%:*}"',
    "",
    'if [[ -z "$TAG" ]]; then',
    '  DEV_NS="${PACKAGE}-dev"',
    "",
    '  DEV_IMAGE=$(kubectl get deployment nextjs -n "$DEV_NS" \\',
    "    -o jsonpath='{.spec.template.spec.containers[?(@.name==\"nextjs\")].image}' 2>/dev/null) || true",
    "",
    '  if [[ -z "$DEV_IMAGE" ]]; then',
    '    if kubectl get namespace "$DEV_NS" &>/dev/null; then',
    "      die \"No 'nextjs' deployment found in dev namespace '$DEV_NS'. Pass an explicit tag: $(basename \"$0\") $PACKAGE <tag>\"",
    "    else",
    '      die "Dev namespace \'$DEV_NS\' does not exist. Pass an explicit tag: $(basename "$0") $PACKAGE <tag>"',
    "    fi",
    "  fi",
    "",
    '  TAG="${DEV_IMAGE##*:}"',
    '  log "No tag specified — using dev namespace ($DEV_NS) tag: $TAG"',
    "fi",
    "",
    'FULL_IMAGE="${IMAGE_BASE}:${TAG}"',
    "",
    'log "Promoting $PACKAGE to $FULL_IMAGE"',
    'kubectl set image -n "$PACKAGE" deployment/nextjs "nextjs=${FULL_IMAGE}"',
    "",
    'if ! kubectl rollout status -n "$PACKAGE" deployment/nextjs --timeout=120s; then',
    '  err "Rollout failed — rolling back to previous revision"',
    '  kubectl rollout undo -n "$PACKAGE" deployment/nextjs',
    '  kubectl rollout status -n "$PACKAGE" deployment/nextjs --timeout=120s',
    "  exit 1",
    "fi",
    "",
    'ok "Next.js deployment rolled out successfully"',
    "",
    'ok "Promote complete: $PACKAGE → $TAG"',
  ]
  return `${lines.join("\n")}\n`
}
