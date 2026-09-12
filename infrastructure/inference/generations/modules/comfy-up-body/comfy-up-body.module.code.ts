import { buildingFrom } from "akasha/infrastructure/inference/generations/modules/comfy-up-building/comfy-up-building.module.code.ts"
import { guarding } from "akasha/infrastructure/inference/generations/modules/comfy-up-guarding/comfy-up-guarding.module.code.ts"

const SHARED = "z"

export type ComfyUp = {
  readonly name: string
  readonly port: number
  readonly smoke: string | null
}

function opening(given: ComfyUp): readonly string[] {
  const named = given.name.toUpperCase()
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    "",
    `IMAGE="\${${named}_IMAGE:-${given.name}:local}"`,
    `CONTAINER="\${${named}_CONTAINER:-${given.name}}"`,
    `PORT="\${${named}_PORT:-${given.port}}"`,
    `DATA="\${${named}_HOME:-$HOME/.local/share/${given.name}}"`,
    "",
  ]
}

function closingOf(given: ComfyUp): string {
  const tail = given.smoke === null ? "" : `  |  Verify the GPU path: shell-script/${given.smoke}`
  return `echo "    Data dir: $DATA${tail}"`
}

function running(given: ComfyUp): readonly string[] {
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
    `  -p "127.0.0.1:$PORT:${given.port}" \\`,
    `  -v "$DATA/cache:/root/.cache:${SHARED}" \\`,
    `  -v "$DATA/models:/app/ComfyUI/models:${SHARED}" \\`,
    `  -v "$DATA/inputs:/app/ComfyUI/input:${SHARED}" \\`,
    `  -v "$DATA/outputs:/app/ComfyUI/output:${SHARED}" \\`,
    '  "$IMAGE" >/dev/null',
    "",
    'echo "==> Started. ComfyUI: http://localhost:$PORT"',
    closingOf(given),
  ]
}

export function comfyUpBody(recipe: string, given: ComfyUp): string {
  const lines = [...opening(given), ...guarding(), ...buildingFrom(recipe), ...running(given)]
  return `${lines.join("\n")}\n`
}
