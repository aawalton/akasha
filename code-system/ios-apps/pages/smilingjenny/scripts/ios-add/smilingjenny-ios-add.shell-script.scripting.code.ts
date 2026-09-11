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
    "# cap is a devDependency binary, and bun hoists it to the workspace root rather",
    "# than leaving it beside the package that depends on it — so it is looked for the",
    "# way node resolves one, from this package upward. Reached through `bun run` it is",
    "# already on PATH and reached by running this file directly it is not, and a PATH",
    "# that happens to hold it is not something to build on.",
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
    `bash "$SHARED/${relative(shared, shellOf(given, CONFIGURING))}" \\`,
    `  "$PACKAGE/${relative(held, appFileOf(given, CAPACITOR_CONFIG))}"`,
    "# BEFORE the Capacitor call, which copies whatever stands in webDir into the native",
    "# project. Staged after, this run would ship the page the run before it left there.",
    `bash "$SHARED/${relative(shared, shellOf(given, STAGING))}" \\`,
    `  "$PACKAGE/${relative(held, appFileOf(given, WEB_ENTRY))}"`,
    '"$CAP" "$MODE" ios',
    `bash "$HERE/${relative(here, shellOf(given, SEAM))}"`,
  ]
  return `${lines.join("\n")}\n`
}
