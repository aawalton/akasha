#!/usr/bin/env bash
set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
PROGRAM="alanwalton-decode-harness"
PROGRAM_DIR="$AKASHA_ROOT/code-system/ios-programs/pages/$PROGRAM"
[ -f "$PROGRAM_DIR/main.swift" ] || {
  echo "ERROR: no main.swift at $PROGRAM_DIR — a program's top level statements stand beside its akasha page, and swiftc has no entry point without it." >&2
  exit 2
}
COMPONENTS_DIR="$(cd "$AKASHA_ROOT/code-system/ios-components/pages" 2>/dev/null && pwd)" || {
  echo "ERROR: no ios components at $AKASHA_ROOT/code-system/ios-components/pages — every tile's Swift is authored there, so nothing can be decoded without it. Set AKASHA_ROOT if that checkout is elsewhere." >&2
  exit 2
}
# Which components this harness compiles is stated on its akasha ios-program page.
# The directory holds every app's, and compiling all of them would put two
# definitions of one symbol into a single build.
NAMED="$(cd "$AKASHA_ROOT" && bun -e 'import {componentSwiftForProgram} from "akasha/alan/harness/mobile-cli/ios-program-components/ios-program-components.module.code.ts"; process.stdout.write(componentSwiftForProgram(process.argv[1]).join("\n"))' "$PROGRAM")" || {
  echo "ERROR: could not read the components $PROGRAM names from its akasha ios-program page." >&2
  exit 2
}
BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR"' EXIT

SOURCES=()
while IFS= read -r component; do
  [ -n "$component" ] || continue
  [ -f "$COMPONENTS_DIR/$component" ] || {
    echo "ERROR: $COMPONENTS_DIR/$component is named by $PROGRAM and is not there." >&2
    exit 2
  }
  SOURCES+=("$COMPONENTS_DIR/$component")
done <<< "$NAMED"

# The seam writes DeviceSecretPins.swift beside the widget sources on every
# build, from values the ios-app page carries, and never commits it. This
# harness runs no seam, so a component reading those pins has nothing to compile
# against. It decodes the bodies it is handed and queries no keychain, so a
# placeholder saying what it is replaces the generated one.
if grep -lq DeviceSecretPins "${SOURCES[@]}" 2>/dev/null; then
  cat > "$BUILD_DIR/DeviceSecretPins.swift" <<'SWIFT_PINS'
// Written by the decode harness. Nothing reads these: the harness decodes the
// bodies it is handed rather than reading a keychain.
enum DeviceSecretPins {
    static let service = "decode-harness-placeholder"
    static let accessGroup = "decode-harness-placeholder"
}
SWIFT_PINS
  SOURCES+=("$BUILD_DIR/DeviceSecretPins.swift")
fi

DEVICE="$(xcrun simctl list devices booted | sed -n 's/.*(\([0-9A-Fa-f-]\{36\}\)) (Booted).*/\1/p' | head -1)"
if [[ -z "$DEVICE" ]]; then
  echo "ERROR: no booted simulator. Boot one (\`xcrun simctl boot <udid>\`) and retry." >&2
  exit 1
fi

xcrun -sdk iphonesimulator swiftc \
  -target arm64-apple-ios17.0-simulator \
  "${SOURCES[@]}" "$PROGRAM_DIR/main.swift" \
  -o "$BUILD_DIR/decode-harness"

xcrun simctl spawn "$DEVICE" "$BUILD_DIR/decode-harness"
