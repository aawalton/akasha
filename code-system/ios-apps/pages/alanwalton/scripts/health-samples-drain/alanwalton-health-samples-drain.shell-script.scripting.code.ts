import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "alanwalton-health-samples-drain"

const SHELL = "shell"

const SOURCED: readonly string[] = [
  "alanwalton-health-anchored-read",
  "alanwalton-health-cursorless-backstop",
  "alanwalton-health-route-request",
  "alanwalton-health-remembered-state",
  "alanwalton-health-foreground-sync",
]

function ownFolder(given: string | Reading): string {
  return dirname(valuedAt(given, SCRIPT, OWN).path)
}

function partsUnder(given: string | Reading): string {
  return dirname(ownFolder(given))
}

export function upIn(given: string | Reading): string {
  return relative(ownFolder(given), partsUnder(given))
}

export function partsIn(given: string | Reading): readonly string[] {
  const under = partsUnder(given)
  return SOURCED.map((slug) =>
    relative(under, fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL))
  )
}

function sourcing(up: string, parts: readonly string[]): readonly string[] {
  return parts.flatMap((one) => [`# shellcheck source=${up}/${one}`, `. "$SEAM_PART_DIR/${one}"`])
}

export function bodyIn(given: string | Reading): string {
  const up = upIn(given)
  const lines = [
    "#!/usr/bin/env bash",
    "",
    `SEAM_PART_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/${up}" && pwd)"`,
    "",
    'if [[ "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then',
    ...sourcing(up, partsIn(given)),
    'echo "OK: appended StreamHealthSamplesIntent to $APPDELEGATE"',
    "else",
    'echo "OK: stream-health-samples app intent seam SKIPPED — NATIVE_SHELL_HEALTH_SAMPLES_INTENT=0 (no Swift appended)."',
    "fi",
  ]
  return `${lines.join("\n")}\n`
}
