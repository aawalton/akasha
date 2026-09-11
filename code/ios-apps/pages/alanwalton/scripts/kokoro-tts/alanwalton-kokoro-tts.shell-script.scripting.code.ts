import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "alanwalton-kokoro-tts"

const IN_ORDER = [
  "alanwalton-kokoro-plugin-declaration",
  "alanwalton-kokoro-model-preparation",
  "alanwalton-kokoro-playback-control",
]

const UNDER = "$SEAM_PART_DIR/"

const UP = "../"

function shellAt(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

export function partsIn(given: string | Reading): readonly string[] {
  return IN_ORDER.map((slug) => shellAt(given, slug))
}

export function bodyIn(given: string | Reading): string {
  const under = dirname(dirname(shellAt(given, OWN)))
  const lines = [
    "#!/usr/bin/env bash",
    "",
    'SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"',
    "",
    'if [[ "$KOKORO_TTS_ENABLED" == "1" ]]; then',
    ...partsIn(given)
      .map((one) => relative(under, one))
      .flatMap((one) => [`# shellcheck source=${UP}${one}`, `. "${UNDER}${one}"`]),
    "fi",
  ]
  return `${lines.join("\n")}\n`
}
