import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const MODULE = "python-module"

const PYTHON = "python"

const OWN = "upscale-srpo"

const GRAPH = "upscale-srpo-graph"

function shellOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

function pythonOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, MODULE, slug), MODULE, PYTHON)
}

export function graphIn(given: string | Reading): string {
  return relative(dirname(dirname(shellOf(given, OWN))), pythonOf(given, GRAPH))
}

function opening(): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"',
    'PORT="${UPSCALE_PORT:-8677}"',
    'BASE="http://127.0.0.1:${PORT}"',
    'PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    "",
  ]
}

function taking(): readonly string[] {
  return [
    'if [ "$#" -lt 2 ]; then',
    '  echo "usage: upscale-srpo <clean-image-path> <output-prefix> [denoise] [guidance]" >&2',
    "  exit 2",
    "fi",
    'SRC="$1"',
    'PREFIX="$2"',
    'DENOISE="${3:-0.18}"',
    'GUIDANCE="${4:-3.5}"',
    "",
  ]
}

function checking(): readonly string[] {
  return [
    'if [ ! -f "$SRC" ]; then',
    '  echo "ERROR: source image not found: $SRC" >&2',
    "  exit 1",
    "fi",
    "for f in models/unet/srpo-Q6_K.gguf models/text_encoders/t5xxl_fp8_e4m3fn.safetensors \\",
    "         models/text_encoders/clip_l.safetensors models/vae/ae.safetensors; do",
    '  if [ ! -f "$DATA/$f" ]; then',
    '    echo "ERROR: SRPO model missing: $DATA/$f — run shell-script/upscale-provision srpo" >&2',
    "    exit 1",
    "  fi",
    "done",
    'if ! curl -sf "$BASE/system_stats" >/dev/null 2>&1; then',
    '  echo "ERROR: ComfyUI daemon not reachable at $BASE — start it: shell-script/upscale-up" >&2',
    "  exit 1",
    "fi",
    "",
  ]
}

function staging(): readonly string[] {
  return [
    'IMG_NAME="_srpo_in_$(basename "$SRC")"',
    'cp -f "$SRC" "$DATA/inputs/$IMG_NAME"',
    "",
    'read -r W H < <(identify -format "%w %h\\n" "$SRC")',
    'echo "==> SRPO refine: $(basename "$SRC")  (${W}x${H}, denoise=${DENOISE}, guidance=${GUIDANCE})"',
    "",
    "shopt -s nullglob",
    'before=("$DATA"/outputs/"${PREFIX}"_*.png)',
    "BEFORE_N=${#before[@]}",
    "",
  ]
}

function refining(given: string | Reading): readonly string[] {
  const at = graphIn(given)
  return [
    `python3 "$PKG_DIR/${at}" \\`,
    '  --base "$BASE" --image "$IMG_NAME" --prefix "$PREFIX" \\',
    '  --width "$W" --height "$H" --denoise "$DENOISE" --guidance "$GUIDANCE"',
    "",
  ]
}

function closing(): readonly string[] {
  return [
    'after=("$DATA"/outputs/"${PREFIX}"_*.png)',
    'if [ "${#after[@]}" -le "$BEFORE_N" ]; then',
    "  echo \"ERROR: no new SRPO output '${PREFIX}_*.png' appeared under $DATA/outputs\" >&2",
    '  rm -f "$DATA/inputs/$IMG_NAME"',
    "  exit 1",
    "fi",
    'newest="${after[0]}"',
    'for candidate in "${after[@]}"; do',
    '  if [ "$candidate" -nt "$newest" ]; then',
    '    newest="$candidate"',
    "  fi",
    "done",
    'rm -f "$DATA/inputs/$IMG_NAME"',
    'echo "==> OK: $newest"',
  ]
}

export function bodyIn(given: string | Reading): string {
  const lines = [
    ...opening(),
    ...taking(),
    ...checking(),
    ...staging(),
    ...refining(given),
    ...closing(),
  ]
  return `${lines.join("\n")}\n`
}
