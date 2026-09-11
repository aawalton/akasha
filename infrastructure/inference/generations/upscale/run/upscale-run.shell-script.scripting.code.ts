import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "upscale-run"

const CLEANING = "upscale-seedvr2"

const REFINING = "upscale-srpo"

function shellOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

function packageAt(given: string | Reading): string {
  return dirname(dirname(shellOf(given, OWN)))
}

export function cleaningIn(given: string | Reading): string {
  return relative(packageAt(given), shellOf(given, CLEANING))
}

export function refiningIn(given: string | Reading): string {
  return relative(packageAt(given), shellOf(given, REFINING))
}

function opening(): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    'DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"',
    "",
  ]
}

function taking(): readonly string[] {
  return [
    'if [ "$#" -lt 2 ]; then',
    '  echo "usage: upscale-run <input-name> <base-name> [resolution] [--srpo|--no-srpo]" >&2',
    "  exit 2",
    "fi",
    'IN_NAME="$1"; BASE="$2"; shift 2',
    "RESOLUTION=1460",
    "SRPO_MODE=auto",
    'for arg in "$@"; do',
    '  case "$arg" in',
    "    --srpo) SRPO_MODE=force ;;",
    "    --no-srpo) SRPO_MODE=off ;;",
    "    ''|*[!0-9]*) echo \"ERROR: unknown arg '$arg'\" >&2; exit 2 ;;",
    '    *) RESOLUTION="$arg" ;;',
    "  esac",
    "done",
    "",
  ]
}

function cleaning(given: string | Reading): readonly string[] {
  const at = cleaningIn(given)
  return [
    'CLEAN_NAME="${BASE}-seedvr2-v25-clean.png"',
    `bash "$PKG_DIR/${at}" "$IN_NAME" "$CLEAN_NAME" "$RESOLUTION"`,
    "",
  ]
}

function deciding(): readonly string[] {
  return [
    "run_srpo=0",
    'if [ "$SRPO_MODE" = force ]; then',
    "  run_srpo=1",
    'elif [ "$SRPO_MODE" = auto ] && [ -f "$DATA/models/unet/srpo-Q6_K.gguf" ]; then',
    "  run_srpo=1",
    "fi",
    "",
  ]
}

function refining(given: string | Reading): readonly string[] {
  const at = refiningIn(given)
  return [
    'if [ "$run_srpo" = 1 ]; then',
    `  bash "$PKG_DIR/${at}" "$DATA/outputs/$CLEAN_NAME" "\${BASE}-seedvr2-v25-srpo"`,
    "else",
    '  echo "==> stage 2 (SRPO) skipped (mode=$SRPO_MODE)."',
    "fi",
    'echo "==> done: $BASE"',
  ]
}

export function bodyIn(given: string | Reading): string {
  const lines = [...opening(), ...taking(), ...cleaning(given), ...deciding(), ...refining(given)]
  return `${lines.join("\n")}\n`
}
