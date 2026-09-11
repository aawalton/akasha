import { dirname, join } from "node:path"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { filePropertiesAt } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { listedAt, valuesByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import {
  slugsIn,
  textAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { upFrom } from "akasha/utils/narrow/up-from/up-from.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "smilingjenny-decode-harness-run"

const PROGRAM = "ios-program"

const DECODING = "smilingjenny-decode-harness"

const COMPONENT = "ios-component"

const SWIFT = "swift"

const MAIN = "main"

const COMPONENTS = "components"

const UNDER = "$AKASHA_ROOT/"

type Held = {
  readonly path: string
  readonly value: Value
}

function pageOf(given: string | Reading, pageTypeSlug: string, slug: string): Held {
  const listed = listedAt(given, pageTypeSlug, slug)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${pageTypeSlug}\` page carries the slug \`${slug}\`, so this script names nothing`
    )
  }
  const value = valuesByPath(given, pageTypeSlug).get(listed.path)
  if (value === undefined) {
    throw new Error(`\`${listed.path}\` is filed under \`${pageTypeSlug}\` and carries no value`)
  }
  return { path: listed.path, value }
}

function fileOf(
  given: string | Reading,
  page: Held,
  pageTypeSlug: string,
  propertySlug: string
): string {
  const fileName = filePropertiesAt(given).get(pageTypeSlug)?.get(propertySlug)
  if (fileName === undefined) {
    throw new Error(`a \`${pageTypeSlug}\` page holds no \`${propertySlug}\` in a file of its own`)
  }
  if (fileName !== null) return join(dirname(page.path), fileName)
  const held = textAt(page.value, exportedAs(propertySlug))
  if (held === null) {
    throw new Error(`\`${page.path}\` states no \`${propertySlug}\`, so nothing sits beside it`)
  }
  const at = besideAt(page.path, propertySlug, held)
  if (at === null) throw new Error(`\`${page.path}\` is no TypeScript file, and a page is one`)
  return at
}

export function componentSwiftIn(given: string | Reading): readonly string[] {
  const program = pageOf(given, PROGRAM, DECODING)
  return slugsIn(program.value[exportedAs(COMPONENTS)]).map((slug) =>
    fileOf(given, pageOf(given, COMPONENT, slug), COMPONENT, SWIFT)
  )
}

export function mainSwiftIn(given: string | Reading): string {
  return fileOf(given, pageOf(given, PROGRAM, DECODING), PROGRAM, MAIN)
}

export function scriptIn(given: string | Reading): string {
  const own = pageOf(given, SCRIPT, OWN)
  const lines = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
    "# This script sits in akasha, so the checkout is found from the script rather",
    "# than guessed at $HOME/repos/akasha, which was right on one machine.",
    `AKASHA_ROOT="\${AKASHA_ROOT:-$(cd "$HERE/${upFrom(own.path)}" && pwd)}"`,
    `PROGRAM="${DECODING}"`,
    `MAIN_SWIFT="${UNDER}${mainSwiftIn(given)}"`,
    '[ -f "$MAIN_SWIFT" ] || {',
    '  echo "ERROR: no main.swift at $MAIN_SWIFT — a program\'s top level statements sit beside its akasha page, and swiftc has no entry point without it." >&2',
    "  exit 2",
    "}",
    "# Which components this harness compiles is stated on its akasha ios-program",
    "# page, and this list is written from that page rather than read on each run.",
    "COMPONENT_SWIFT=(",
    ...componentSwiftIn(given).map((one) => `  "${UNDER}${one}"`),
    ")",
    'BUILD_DIR="$(mktemp -d)"',
    "trap 'rm -rf \"$BUILD_DIR\"' EXIT",
    "",
    'for component in "${COMPONENT_SWIFT[@]}"; do',
    '  [ -f "$component" ] || {',
    '    echo "ERROR: $component is named by $PROGRAM and is not there." >&2',
    "    exit 2",
    "  }",
    "done",
    'SOURCES=("${COMPONENT_SWIFT[@]}")',
    "",
    "# The seam writes DeviceSecretPins.swift beside the widget sources on every",
    "# build, from values the ios-app page carries, and never commits it. This",
    "# harness runs no seam, so a component reading those pins has nothing to compile",
    "# against. It decodes the bodies it is handed and queries no keychain, so a",
    "# placeholder saying what it is replaces the generated one.",
    'if grep -lq DeviceSecretPins "${SOURCES[@]}" 2>/dev/null; then',
    "  cat > \"$BUILD_DIR/DeviceSecretPins.swift\" <<'SWIFT_PINS'",
    "// Written by the decode harness. Nothing reads these: the harness decodes the",
    "// bodies it is handed rather than reading a keychain.",
    "enum DeviceSecretPins {",
    '    static let service = "decode-harness-placeholder"',
    '    static let accessGroup = "decode-harness-placeholder"',
    "}",
    "SWIFT_PINS",
    '  SOURCES+=("$BUILD_DIR/DeviceSecretPins.swift")',
    "fi",
    "",
    "DEVICE=\"$(xcrun simctl list devices booted | sed -n 's/.*(\\([0-9A-Fa-f-]\\{36\\}\\)) (Booted).*/\\1/p' | head -1)\"",
    'if [ -z "$DEVICE" ]; then',
    '  echo "ERROR: no booted simulator. Boot one (\\`xcrun simctl boot <udid>\\`) and retry." >&2',
    "  exit 1",
    "fi",
    "",
    "xcrun -sdk iphonesimulator swiftc \\",
    "  -target arm64-apple-ios17.0-simulator \\",
    '  "${SOURCES[@]}" "$MAIN_SWIFT" \\',
    '  -o "$BUILD_DIR/decode-harness"',
    "",
    'xcrun simctl spawn "$DEVICE" "$BUILD_DIR/decode-harness"',
  ]
  return `${lines.join("\n")}\n`
}
