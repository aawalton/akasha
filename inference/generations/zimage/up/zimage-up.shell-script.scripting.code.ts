import { dirname, relative } from "node:path"
import { buildingFrom } from "akasha/inference/generations/comfy-up-building/comfy-up-building.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const RECIPE = "container-recipe"

const FILE = "recipe"

const OWN = "zimage-up"

const BUILT = "zimage-image"

function packageOf(given: string | Reading): string {
  return dirname(dirname(fileOf(given, valuedAt(given, SCRIPT, OWN), SCRIPT, SHELL)))
}

export function recipeAt(given: string | Reading): string {
  return relative(packageOf(given), fileOf(given, valuedAt(given, RECIPE, BUILT), RECIPE, FILE))
}

function opening(): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    "",
    'IMAGE="${ZIMAGE_IMAGE:-zimage:local}"',
    'CONTAINER="${ZIMAGE_CONTAINER:-zimage}"',
    'PORT="${ZIMAGE_PORT:-8678}"',
    'DATA="${ZIMAGE_HOME:-$HOME/.local/share/zimage}"',
    "",
  ]
}

function checking(): readonly string[] {
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
    'echo "==> Starting $CONTAINER with GPU access…"',
    "podman run -d \\",
    "  --init \\",
    '  --name "$CONTAINER" \\',
    "  --device nvidia.com/gpu=all \\",
    '  -p "127.0.0.1:$PORT:8678" \\',
    '  -v "$DATA/cache:/root/.cache:z" \\',
    '  -v "$DATA/models:/app/ComfyUI/models:z" \\',
    '  -v "$DATA/inputs:/app/ComfyUI/input:z" \\',
    '  -v "$DATA/outputs:/app/ComfyUI/output:z" \\',
    '  "$IMAGE" >/dev/null',
    "",
    'echo "==> Started. ComfyUI: http://localhost:$PORT"',
    'echo "    Data dir: $DATA  |  Verify the GPU path: shell-script/zimage-smoke"',
  ]
}

export function bodyIn(given: string | Reading): string {
  const lines = [...opening(), ...checking(), ...buildingFrom(recipeAt(given)), ...running()]
  return `${lines.join("\n")}\n`
}
