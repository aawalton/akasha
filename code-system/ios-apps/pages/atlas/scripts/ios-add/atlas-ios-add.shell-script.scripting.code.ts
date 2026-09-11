import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "atlas-ios-add"

const SEAM = "atlas-ios-seam"

const CONFIG = "write-capacitor-config"

const APP = "ios-app"

const WHOSE = "atlas"

const CAPACITOR = "capacitor-config"

type Reaching = {
  readonly here: string
  readonly shellAt: string
  readonly sharedAt: string
  readonly config: string
  readonly capacitor: string
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
    shellAt: dirname(app.path),
    sharedAt: dirname(dirname(config)),
    config,
    capacitor: fileOf(given, app, APP, CAPACITOR),
    seam: shellOf(given, SEAM),
  }
}

export function scriptFilesIn(given: string | Reading): readonly string[] {
  const reached = reachingIn(given)
  return [reached.config, reached.capacitor, reached.seam]
}

export function bodyIn(given: string | Reading): string {
  const reached = reachingIn(given)
  const lines = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# The one way into this shell. `add` makes the native sources from nothing,",
    "# `sync` refreshes ones already there, and everything either side of that call",
    "# is the same for both.",
    'MODE="${1:-}"',
    'case "$MODE" in',
    "  add | sync) ;;",
    "  *)",
    "    echo \"ERROR: pass 'add' to make the native sources or 'sync' to refresh them — got '${MODE:-nothing}'.\" >&2",
    "    exit 2",
    "    ;;",
    "esac",
    "",
    'HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
    `SHELL_DIR="$(cd "$HERE/${relative(reached.here, reached.shellAt)}" && pwd)"`,
    `SHARED="$(cd "$SHELL_DIR/${relative(reached.shellAt, reached.sharedAt)}" && pwd)"`,
    'cd "$SHELL_DIR"',
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
    `bash "$SHARED/${relative(reached.sharedAt, reached.config)}" \\`,
    `  "$SHELL_DIR/${relative(reached.shellAt, reached.capacitor)}"`,
    "",
    "# Capacitor reads its config out of the folder it runs in and refuses a folder",
    "# holding no manifest, so it runs at the root above. The config written there names",
    "# this shell's own web directory and native sources from that root.",
    'cd "$TREE_ROOT"',
    '"$CAP" "$MODE" ios',
    'cd "$SHELL_DIR"',
    `bash "$HERE/${relative(reached.here, reached.seam)}"`,
  ]
  return `${lines.join("\n")}\n`
}
