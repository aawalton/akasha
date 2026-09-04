#!/usr/bin/env bash
set -euo pipefail

# Everything this seam READS is in akasha and is found from this script.
# Everything it WRITES is under ios/, which belongs to the package it was run in
# and is reached from the working directory.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IOS_APP_DIR="$(cd "$HERE/../../../.." && pwd)"
SHARED_IOS_SEAM_DIR="$IOS_APP_DIR/scripts"

PLIST="ios/App/App/Info.plist"
APPDELEGATE="ios/App/App/AppDelegate.swift"
PB="/usr/libexec/PlistBuddy"

if [[ ! -x "$PB" ]]; then
  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2
  exit 1
fi
if [[ ! -f "$PLIST" ]]; then
  echo "ERROR: $PLIST not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if [[ ! -f "$SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh not found — the App binary could not be stamped, and an unstamped binary is refused at the upload gate." >&2
  exit 1
fi
# shellcheck source=code-system/ios-apps/scripts/build-stamp/build-stamp.shell-script.shell.sh
. "$SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh"

LOCATION_ALWAYS_DESC="Atlas records your location in the background to map the streets and sidewalks you have walked, so you can see how much of an area you have covered."
LOCATION_WHENINUSE_DESC="Atlas uses your location to record the paths you walk."

"$PB" -c "Delete :UIBackgroundModes" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :UIBackgroundModes array" "$PLIST"
"$PB" -c "Add :UIBackgroundModes:0 string location" "$PLIST"
echo "OK: UIBackgroundModes=[location] applied to $PLIST"

"$PB" -c "Delete :NSLocationAlwaysAndWhenInUseUsageDescription" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :NSLocationAlwaysAndWhenInUseUsageDescription string ${LOCATION_ALWAYS_DESC}" "$PLIST"
"$PB" -c "Delete :NSLocationWhenInUseUsageDescription" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :NSLocationWhenInUseUsageDescription string ${LOCATION_WHENINUSE_DESC}" "$PLIST"
"$PB" -c "Delete :NSLocationAlwaysUsageDescription" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :NSLocationAlwaysUsageDescription string ${LOCATION_ALWAYS_DESC}" "$PLIST"
echo "OK: NSLocation* usage descriptions applied to $PLIST"

"$PB" -c "Delete :ITSAppUsesNonExemptEncryption" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :ITSAppUsesNonExemptEncryption bool false" "$PLIST"
echo "OK: ITSAppUsesNonExemptEncryption=false applied to $PLIST"

# This app builds no widget extension, so the App binary is the only one to stamp.
native_shell_stamp_app "$APPDELEGATE"
