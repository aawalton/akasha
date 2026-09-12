import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { slugsIn } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { upFrom } from "akasha/utils/narrow/up-from/up-from.module.code.ts"

const SCRIPT = "shell-script"

const PROGRAM = "ios-program"

const COMPONENT = "ios-component"

const SWIFT = "swift"

const MAIN = "main"

const COMPONENTS = "components"

const UNDER = "$AKASHA_ROOT/"

export function componentSwiftOf(given: string | Reading, programSlug: string): readonly string[] {
  const program = valuedAt(given, PROGRAM, programSlug)
  return slugsIn(program.value[exportedAs(COMPONENTS)]).map((slug) =>
    fileOf(given, valuedAt(given, COMPONENT, slug), COMPONENT, SWIFT)
  )
}

export function mainSwiftOf(given: string | Reading, programSlug: string): string {
  return fileOf(given, valuedAt(given, PROGRAM, programSlug), PROGRAM, MAIN)
}

export function scriptBodyOf(
  given: string | Reading,
  scriptSlug: string,
  programSlug: string
): string {
  const own = valuedAt(given, SCRIPT, scriptSlug)
  const lines = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    'HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
    "# This script sits in akasha, so the checkout is found from the script rather",
    "# than guessed at $HOME/repos/akasha, which was right on one machine.",
    `AKASHA_ROOT="\${AKASHA_ROOT:-$(cd "$HERE/${upFrom(own.path)}" && pwd)}"`,
    `PROGRAM="${programSlug}"`,
    `MAIN_SWIFT="${UNDER}${mainSwiftOf(given, programSlug)}"`,
    '[ -f "$MAIN_SWIFT" ] || {',
    '  echo "ERROR: no main.swift at $MAIN_SWIFT — a program\'s top level statements sit beside its akasha page, and swiftc has no entry point without it." >&2',
    "  exit 2",
    "}",
    "# Which components this harness compiles is stated on its akasha ios-program",
    "# page, and this list is written from that page rather than read on each run.",
    "COMPONENT_SWIFT=(",
    ...componentSwiftOf(given, programSlug).map((one) => `  "${UNDER}${one}"`),
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
