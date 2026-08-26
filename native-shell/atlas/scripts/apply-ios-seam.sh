#!/usr/bin/env bash
set -euo pipefail

PLIST="ios/App/App/Info.plist"
PB="/usr/libexec/PlistBuddy"

if [[ ! -x "$PB" ]]; then
  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2
  exit 1
fi
if [[ ! -f "$PLIST" ]]; then
  echo "ERROR: $PLIST not found — run 'npx cap add ios' first." >&2
  exit 1
fi

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
