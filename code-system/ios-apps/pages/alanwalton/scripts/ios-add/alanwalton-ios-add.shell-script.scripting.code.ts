import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "alanwalton-ios-add"

const SEAM = "alanwalton-ios-seam"

const CONFIG = "write-capacitor-config"

const STAGING = "stage-web-entry"

const APP = "ios-app"

const WHOSE = "alanwalton"

const CAPACITOR = "capacitor-config"

const ENTRY = "web-entry"

type Reaching = {
  readonly here: string
  readonly packageAt: string
  readonly sharedAt: string
  readonly config: string
  readonly capacitor: string
  readonly staging: string
  readonly entry: string
  readonly seam: string
}

function shellOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

function reachingIn(given: string | Reading): Reaching {
  const app = valuedAt(given, APP, WHOSE)
  const config = shellOf(given, CONFIG)
  return {
    here: dirname(valuedAt(given, SCRIPT, OWN).path),
    packageAt: dirname(app.path),
    sharedAt: dirname(dirname(config)),
    config,
    capacitor: fileOf(given, app, APP, CAPACITOR),
    staging: shellOf(given, STAGING),
    entry: fileOf(given, app, APP, ENTRY),
    seam: shellOf(given, SEAM),
  }
}

export function scriptFilesIn(given: string | Reading): readonly string[] {
  const reached = reachingIn(given)
  return [reached.config, reached.capacitor, reached.staging, reached.entry, reached.seam]
}

export function bodyIn(given: string | Reading): string {
  const reached = reachingIn(given)
  const lines = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# The one way into this package. `add` generates the native project from nothing,",
    "# `sync` refreshes one that already stands, and everything either side of that call",
    "# is the same for both. The manifest carried both chains in full until this script",
    "# stood, differing by a single word with nothing keeping the rest in step.",
    'MODE="${1:-}"',
    'case "$MODE" in',
    "  add | sync) ;;",
    "  *)",
    "    echo \"ERROR: pass 'add' to generate the native project or 'sync' to refresh one — got '${MODE:-nothing}'.\" >&2",
    "    exit 2",
    "    ;;",
    "esac",
    "",
    'HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
    `PACKAGE="$(cd "$HERE/${relative(reached.here, reached.packageAt)}" && pwd)"`,
    `SHARED="$(cd "$PACKAGE/${relative(reached.packageAt, reached.sharedAt)}" && pwd)"`,
    'cd "$PACKAGE"',
    "",
    "# cap is a devDependency binary, and bun hoists it to the workspace root rather",
    "# than leaving it beside the package that depends on it — so it is looked for the",
    "# way node resolves one, from this package upward.",
    'CAP=""',
    'CANDIDATE="$PACKAGE"',
    'while [[ "$CANDIDATE" != "/" ]]; do',
    '  if [[ -x "$CANDIDATE/node_modules/.bin/cap" ]]; then',
    '    CAP="$CANDIDATE/node_modules/.bin/cap"',
    "    break",
    "  fi",
    '  CANDIDATE="$(dirname "$CANDIDATE")"',
    "done",
    'if [[ -z "$CAP" ]]; then',
    "  echo \"ERROR: no Capacitor CLI in any node_modules/.bin from $PACKAGE upward — it is a devDependency of this package and the workspace installs it. Run 'bun install' at the repo root.\" >&2",
    "  exit 1",
    "fi",
    "",
    `bash "$SHARED/${relative(reached.sharedAt, reached.config)}" \\`,
    `  "$PACKAGE/${relative(reached.packageAt, reached.capacitor)}"`,
    "# BEFORE the Capacitor call, which copies whatever sits in webDir into the native",
    "# project. Staged after, this run would ship the page the run before it left there.",
    `bash "$SHARED/${relative(reached.sharedAt, reached.staging)}" \\`,
    `  "$PACKAGE/${relative(reached.packageAt, reached.entry)}"`,
    '"$CAP" "$MODE" ios',
    `bash "$HERE/${relative(reached.here, reached.seam)}"`,
  ]
  return `${lines.join("\n")}\n`
}
