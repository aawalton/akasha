import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { upFrom } from "akasha/utils/narrow/up-from/up-from.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "ci-cost-snapshot"

const MODULE = "module"

const CODE = "code"

const READING = "seat-reading"

const SHOWING = "seat-usage-show"

const UNDER = "$REPO/"

function codeOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, MODULE, slug), MODULE, CODE)
}

export function modulesIn(given: string | Reading): readonly string[] {
  return [codeOf(given, READING), codeOf(given, SHOWING)]
}

export function bodyIn(given: string | Reading): string {
  const own = valuedAt(given, SCRIPT, OWN)
  const lines = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'SESSION_ID="${1:-}"',
    "",
    'if [ -z "$SESSION_ID" ]; then',
    "  echo '{}'",
    "  exit 0",
    "fi",
    "",
    `REPO=$(cd "$(dirname "$(readlink -f -- "\${BASH_SOURCE[0]}")")/${upFrom(own.path)}" && pwd -P)`,
    'BUN_BIN=$(command -v bun || echo "$HOME/.bun/bin/bun")',
    "",
    `# A SESSION UUID IS ALL THIS IS GIVEN, and \`${READING}\` takes it as readily as an agent id. It`,
    "# sits in akasha and reads the seat page there, so the shell parser this used to source — the last",
    "# of the three that could not see a flat scalar — has no callers left.",
    `AGENT_ID=$("$BUN_BIN" "${UNDER}${codeOf(given, READING)}" \\`,
    '  "$SESSION_ID" id 2>/dev/null || true)',
    "",
    'if [ -z "$AGENT_ID" ]; then',
    "  echo '{}'",
    "  exit 0",
    "fi",
    "",
    `"$BUN_BIN" "${UNDER}${codeOf(given, SHOWING)}" "$AGENT_ID"`,
  ]
  return `${lines.join("\n")}\n`
}
