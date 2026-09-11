#!/usr/bin/env bash

"$PB" -c "Delete :UIBackgroundModes" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :UIBackgroundModes array" "$PLIST"
"$PB" -c "Add :UIBackgroundModes:0 string audio" "$PLIST"
echo "OK: UIBackgroundModes=[audio] applied to $PLIST"

"$PB" -c "Delete :ITSAppUsesNonExemptEncryption" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :ITSAppUsesNonExemptEncryption bool false" "$PLIST"
echo "OK: ITSAppUsesNonExemptEncryption=false applied to $PLIST"

if [[ "$URL_SCHEME_ENABLED" == "1" ]]; then
  "$PB" -c "Delete :CFBundleURLTypes" "$PLIST" 2>/dev/null || true
  "$PB" -c "Add :CFBundleURLTypes array" "$PLIST"
  "$PB" -c "Add :CFBundleURLTypes:0 dict" "$PLIST"
  "$PB" -c "Add :CFBundleURLTypes:0:CFBundleURLName string $URL_SCHEME_NAME" "$PLIST"
  "$PB" -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes array" "$PLIST"
  "$PB" -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes:0 string $URL_SCHEME" "$PLIST"
  echo "OK: CFBundleURLTypes=[$URL_SCHEME://] applied to $PLIST"
else
  "$PB" -c "Delete :CFBundleURLTypes" "$PLIST" 2>/dev/null || true
  echo "OK: url-scheme seam SKIPPED — NATIVE_SHELL_URL_SCHEME=0 (CFBundleURLTypes removed)."
fi

if [[ "$HEALTHKIT_ENABLED" == "1" ]]; then
  "$PB" -c "Delete :NSHealthShareUsageDescription" "$PLIST" 2>/dev/null || true
  "$PB" -c "Add :NSHealthShareUsageDescription string ${HEALTH_SHARE_DESC}" "$PLIST"
  "$PB" -c "Delete :NSHealthUpdateUsageDescription" "$PLIST" 2>/dev/null || true
  "$PB" -c "Add :NSHealthUpdateUsageDescription string ${HEALTH_UPDATE_DESC}" "$PLIST"
  echo "OK: NSHealthShareUsageDescription + NSHealthUpdateUsageDescription applied to $PLIST"
else
  "$PB" -c "Delete :NSHealthShareUsageDescription" "$PLIST" 2>/dev/null || true
  "$PB" -c "Delete :NSHealthUpdateUsageDescription" "$PLIST" 2>/dev/null || true
  echo "OK: HealthKit usage-description seam SKIPPED — NATIVE_SHELL_HEALTHKIT=0 (keys removed)."
fi
