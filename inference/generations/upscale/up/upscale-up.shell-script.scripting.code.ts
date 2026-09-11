import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const RECIPE = "container-recipe"

const RECIPE_PROPERTY = "recipe"

const OWN = "upscale-up"

const BUILT = "upscale-image"

function shellOf(given: string | Reading): string {
  return fileOf(given, valuedAt(given, SCRIPT, OWN), SCRIPT, SHELL)
}

export function recipeAt(given: string | Reading): string {
  const page = valuedAt(given, RECIPE, BUILT)
  return relative(dirname(dirname(shellOf(given))), fileOf(given, page, RECIPE, RECIPE_PROPERTY))
}

function opening(): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    "",
    'IMAGE="${UPSCALE_IMAGE:-upscale:local}"',
    'CONTAINER="${UPSCALE_CONTAINER:-upscale}"',
    'PORT="${UPSCALE_PORT:-8677}"',
    'DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"',
    "",
  ]
}

function guarding(): readonly string[] {
  return [
    "if ! command -v podman >/dev/null 2>&1; then",
    '  echo "ERROR: podman not found on PATH." >&2',
    "  exit 1",
    "fi",
    "",
    "if command -v getsebool >/dev/null 2>&1; then",
    '  if [ "$(getsebool container_use_devices 2>/dev/null | awk \'{print $3}\')" != "on" ]; then',
    "    echo \"ERROR: SELinux boolean 'container_use_devices' is off — GPU access will fail\" >&2",
    "    echo \"       with 'Failed to initialize NVML: Insufficient Permissions'.\" >&2",
    '    echo "       Apply the one-time host fix, also set by the workstation provisioner:" >&2',
    '    echo "         sudo setsebool -P container_use_devices on" >&2',
    "    exit 1",
    "  fi",
    "fi",
    "",
  ]
}

function building(given: string | Reading): readonly string[] {
  return [
    'mkdir -p "$DATA/cache" "$DATA/models" "$DATA/inputs" "$DATA/outputs"',
    "",
    'if ! podman image exists "$IMAGE"; then',
    '  echo "==> Building $IMAGE…"',
    `  podman build -t "$IMAGE" -f "$PKG_DIR/${recipeAt(given)}" "$PKG_DIR"`,
    "fi",
    "",
  ]
}

function running(): readonly string[] {
  return [
    'if podman container exists "$CONTAINER"; then',
    '  if [ "$(podman inspect -f \'{{.State.Running}}\' "$CONTAINER" 2>/dev/null)" = "true" ]; then',
    '    echo "==> $CONTAINER already running. ComfyUI: http://localhost:$PORT"',
    "    exit 0",
    "  fi",
    '  podman rm "$CONTAINER" >/dev/null',
    "fi",
    "",
    'echo "==> Starting $CONTAINER with GPU access…"',
    "podman run -d \\",
    "  --init \\",
    '  --name "$CONTAINER" \\',
    "  --device nvidia.com/gpu=all \\",
    '  -p "127.0.0.1:$PORT:8677" \\',
    '  -v "$DATA/cache:/root/.cache:z" \\',
    '  -v "$DATA/models:/app/ComfyUI/models:z" \\',
    '  -v "$DATA/inputs:/app/ComfyUI/input:z" \\',
    '  -v "$DATA/outputs:/app/ComfyUI/output:z" \\',
    '  "$IMAGE" >/dev/null',
    "",
    'echo "==> Started. ComfyUI: http://localhost:$PORT"',
    'echo "    Data dir: $DATA"',
  ]
}

export function bodyIn(given: string | Reading): string {
  const lines = [...opening(), ...guarding(), ...building(given), ...running()]
  return `${lines.join("\n")}\n`
}
