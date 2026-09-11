#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# This script sits in akasha, so the checkout is found from the script rather
# than guessed at $HOME/repos/akasha, which was right on one machine.
AKASHA_ROOT="${AKASHA_ROOT:-$(cd "$HERE/../../../../../.." && pwd)}"
PROGRAM="smilingjenny-decode-harness"
MAIN_SWIFT="$AKASHA_ROOT/code/ios-programs/pages/smilingjenny-decode-harness/main.swift"
[ -f "$MAIN_SWIFT" ] || {
  echo "ERROR: no main.swift at $MAIN_SWIFT — a program's top level statements sit beside its akasha page, and swiftc has no entry point without it." >&2
  exit 2
}
# Which components this harness compiles is stated on its akasha ios-program
# page, and this list is written from that page rather than read on each run.
COMPONENT_SWIFT=(
  "$AKASHA_ROOT/code/ios-components/pages/alanwalton-stoplight-ring/alanwalton-stoplight-ring.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/categorize-ring/categorize-ring.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/falling-checks/falling-checks.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/ring/ring.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/safety-ring/safety-ring.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/scale-checks/scale-checks.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-categorize-view/smilingjenny-categorize-view.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-cost-widget/smilingjenny-cost-widget.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-safety-level-widget/smilingjenny-safety-level-widget.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-surplus-widget/smilingjenny-surplus-widget.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-upkeep-stoplights-widget/smilingjenny-upkeep-stoplights-widget.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-widget-feed/smilingjenny-widget-feed.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/spacing/spacing.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/surplus-ring/surplus-ring.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/tier/tier.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/timeline-checks/timeline-checks.ios-component.swift.swift"
  "$AKASHA_ROOT/code/ios-components/pages/cost-ring/cost-ring.ios-component.swift.swift"
)
BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR"' EXIT

for component in "${COMPONENT_SWIFT[@]}"; do
  [ -f "$component" ] || {
    echo "ERROR: $component is named by $PROGRAM and is not there." >&2
    exit 2
  }
done
SOURCES=("${COMPONENT_SWIFT[@]}")

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
if [ -z "$DEVICE" ]; then
  echo "ERROR: no booted simulator. Boot one (\`xcrun simctl boot <udid>\`) and retry." >&2
  exit 1
fi

xcrun -sdk iphonesimulator swiftc \
  -target arm64-apple-ios17.0-simulator \
  "${SOURCES[@]}" "$MAIN_SWIFT" \
  -o "$BUILD_DIR/decode-harness"

xcrun simctl spawn "$DEVICE" "$BUILD_DIR/decode-harness"
