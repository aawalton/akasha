import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/index/modules/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/index/modules/shape/index-shape.module.code.ts"

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
}

type Reached = readonly [string, string, string, string, string]

function shellOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

function reachingIn(given: string | Reading): Reaching {
  return {
    here: dirname(valuedAt(given, SCRIPT, OWN).path),
    packageAt: dirname(valuedAt(given, APP, WHOSE).path),
    sharedAt: dirname(dirname(shellOf(given, CONFIG))),
  }
}

export function scriptFilesIn(given: string | Reading): Reached {
  const app = valuedAt(given, APP, WHOSE)
  return [
    shellOf(given, CONFIG),
    fileOf(given, app, APP, CAPACITOR),
    shellOf(given, STAGING),
    fileOf(given, app, APP, ENTRY),
    shellOf(given, SEAM),
  ]
}

export function bodyIn(given: string | Reading): string {
  const reached = reachingIn(given)
  const [config, capacitor, staging, entry, seam] = scriptFilesIn(given)
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
    "# The one manifest is at the root of the tree this shell sits in, the install runs",
    "# there, and the Capacitor CLI lands there rather than beside this shell.",
    'TREE_ROOT="${NATIVE_SHELL_TREE_ROOT:?is unset. The one manifest is at the root of the tree this shell sits in, and the command running this build names where that root is.}"',
    'CAP="$TREE_ROOT/node_modules/.bin/cap"',
    '[ -x "$CAP" ] || {',
    '  echo "ERROR: no Capacitor CLI at $CAP. The manifest at that root names it, and the install did not run." >&2',
    "  exit 1",
    "}",
    "",
    `bash "$SHARED/${relative(reached.sharedAt, config)}" \\`,
    `  "$PACKAGE/${relative(reached.packageAt, capacitor)}"`,
    "# BEFORE the Capacitor call, which copies whatever sits in webDir into the native",
    "# project. Staged after, this run would ship the page the run before it left there.",
    `bash "$SHARED/${relative(reached.sharedAt, staging)}" \\`,
    `  "$PACKAGE/${relative(reached.packageAt, entry)}"`,
    "",
    "# Capacitor reads its config out of the folder it runs in and refuses a folder",
    "# holding no manifest, so it runs at the root above. The config written there names",
    "# this shell's own web directory and native sources from that root.",
    'cd "$TREE_ROOT"',
    '"$CAP" "$MODE" ios',
    'cd "$PACKAGE"',
    `bash "$HERE/${relative(reached.here, seam)}"`,
  ]
  return `${lines.join("\n")}\n`
}
