import { dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "smilingjenny-ios-add"

const SEAM = "smilingjenny-ios-seam"

const CONFIGURING = "write-capacitor-config"

const STAGING = "stage-web-entry"

const APP = "ios-app"

const OWNER = "smilingjenny"

const SHELL = "shell"

const CAPACITOR_CONFIG = "capacitor-config"

const WEB_ENTRY = "web-entry"

function shellOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

function appFileOf(given: string | Reading, propertySlug: string): string {
  return fileOf(given, valuedAt(given, APP, OWNER), APP, propertySlug)
}

export function hereIn(given: string | Reading): string {
  return dirname(shellOf(given, OWN))
}

export function packageIn(given: string | Reading): string {
  return dirname(valuedAt(given, APP, OWNER).path)
}

export function sharedIn(given: string | Reading): string {
  return dirname(dirname(shellOf(given, CONFIGURING)))
}

export function reachedIn(given: string | Reading): readonly string[] {
  return [
    shellOf(given, CONFIGURING),
    appFileOf(given, CAPACITOR_CONFIG),
    shellOf(given, STAGING),
    appFileOf(given, WEB_ENTRY),
    shellOf(given, SEAM),
  ]
}

export function bodyIn(given: string | Reading): string {
  const here = hereIn(given)
  const held = packageIn(given)
  const shared = sharedIn(given)
  const lines = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# The one way into this package. `add` generates the native project from nothing,",
    "# `sync` refreshes one that already stands, and everything either side of that call",
    "# is the same for both. The manifest carried both chains in full until this script",
    "# stood: four steps duplicated across two lines differing by a single word, with",
    "# nothing keeping the other three in step.",
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
    `PACKAGE="$(cd "$HERE/${relative(here, held)}" && pwd)"`,
    `SHARED="$(cd "$PACKAGE/${relative(held, shared)}" && pwd)"`,
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
    `bash "$SHARED/${relative(shared, shellOf(given, CONFIGURING))}" \\`,
    `  "$PACKAGE/${relative(held, appFileOf(given, CAPACITOR_CONFIG))}"`,
    "# BEFORE the Capacitor call, which copies whatever stands in webDir into the native",
    "# project. Staged after, this run would ship the page the run before it left there.",
    `bash "$SHARED/${relative(shared, shellOf(given, STAGING))}" \\`,
    `  "$PACKAGE/${relative(held, appFileOf(given, WEB_ENTRY))}"`,
    "",
    "# Capacitor reads its config out of the folder it runs in and refuses a folder",
    "# holding no manifest, so it runs at the root above. The config written there names",
    "# this shell's own web directory and native sources from that root.",
    'cd "$TREE_ROOT"',
    '"$CAP" "$MODE" ios',
    'cd "$PACKAGE"',
    `bash "$HERE/${relative(here, shellOf(given, SEAM))}"`,
  ]
  return `${lines.join("\n")}\n`
}
