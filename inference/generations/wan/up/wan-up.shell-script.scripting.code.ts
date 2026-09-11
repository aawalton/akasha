import { dirname, relative } from "node:path"
import { buildingFrom } from "akasha/inference/generations/comfy-up-building/comfy-up-building.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "wan-up"

const RECIPE = "container-recipe"

const BUILT = "recipe"

const IMAGE = "wan-image"

function packagedIn(given: string | Reading): string {
  return dirname(dirname(fileOf(given, valuedAt(given, SCRIPT, OWN), SCRIPT, SHELL)))
}

export function recipeIn(given: string | Reading): string {
  return relative(packagedIn(given), fileOf(given, valuedAt(given, RECIPE, IMAGE), RECIPE, BUILT))
}

function opening(): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    "",
    'IMAGE="${WAN_IMAGE:-wan:local}"',
    'CONTAINER="${WAN_CONTAINER:-wan}"',
    'PORT="${WAN_PORT:-8676}"',
    'DATA="${WAN_HOME:-$HOME/.local/share/wan}"',
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
  ]
}

function starting(): readonly string[] {
  return [
    'echo "==> Starting $CONTAINER with GPU access…"',
    "podman run -d \\",
    "  --init \\",
    '  --name "$CONTAINER" \\',
    "  --device nvidia.com/gpu=all \\",
    '  -p "127.0.0.1:$PORT:8676" \\',
    '  -v "$DATA/cache:/root/.cache:Z" \\',
    '  -v "$DATA/models:/app/ComfyUI/models:Z" \\',
    '  -v "$DATA/inputs:/app/ComfyUI/input:Z" \\',
    '  -v "$DATA/outputs:/app/ComfyUI/output:Z" \\',
    '  "$IMAGE" >/dev/null',
    "",
    'echo "==> Started. ComfyUI: http://localhost:$PORT"',
    'echo "    Data dir: $DATA  |  Verify the GPU path: shell-script/wan-smoke"',
  ]
}

export function bodyIn(given: string | Reading): string {
  const lines = [
    ...opening(),
    ...guarding(),
    ...buildingFrom(recipeIn(given)),
    ...running(),
    ...starting(),
  ]
  return `${lines.join("\n")}\n`
}
