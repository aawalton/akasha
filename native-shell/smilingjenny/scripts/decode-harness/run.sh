#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
WIDGET_DIR="$(cd "$AKASHA_ROOT/native-shell/smilingjenny/ios-widget" && pwd)"
SHARED_WIDGET_DIR="$(cd "$AKASHA_ROOT/akasha/code-system/ios-component/ios-components" && pwd)"
BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR"' EXIT

SOURCES=()
while IFS= read -r swift; do
  if grep -q '^@main$' "$swift"; then continue; fi
  SOURCES+=("$swift")
done < <(find "$WIDGET_DIR" "$SHARED_WIDGET_DIR" -maxdepth 2 -name '*.swift' | sort)

DEVICE="$(xcrun simctl list devices booted | sed -n 's/.*(\([0-9A-Fa-f-]\{36\}\)) (Booted).*/\1/p' | head -1)"
if [[ -z "$DEVICE" ]]; then
  echo "ERROR: no booted simulator. Boot one (\`xcrun simctl boot <udid>\`) and retry." >&2
  exit 1
fi

xcrun -sdk iphonesimulator swiftc \
  -target arm64-apple-ios17.0-simulator \
  "${SOURCES[@]}" "$HERE/main.swift" \
  -o "$BUILD_DIR/decode-harness"

xcrun simctl spawn "$DEVICE" "$BUILD_DIR/decode-harness"
