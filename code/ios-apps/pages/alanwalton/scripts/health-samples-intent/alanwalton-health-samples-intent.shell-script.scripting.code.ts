import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "alanwalton-health-samples-intent"

const SOURCED = [
  "alanwalton-health-intent-declaration",
  "alanwalton-health-intent-perform",
  "alanwalton-health-intent-anchored-drain",
]

const UNDER = "$SEAM_PART_DIR/"

const UP = "../"

function shellOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

export function sourcedIn(given: string | Reading): readonly string[] {
  const beside = dirname(dirname(shellOf(given, OWN)))
  return SOURCED.map((slug) => relative(beside, shellOf(given, slug)))
}

export function bodyIn(given: string | Reading): string {
  const lines = [
    "#!/usr/bin/env bash",
    "",
    'SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    "",
    'if [[ "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then',
    ...sourcedIn(given).flatMap((at) => [`# shellcheck source=${UP}${at}`, `. "${UNDER}${at}"`]),
    "fi",
  ]
  return `${lines.join("\n")}\n`
}
