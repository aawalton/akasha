#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 02-webview-and-audio.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
insert_import_after_capacitor() {
  local framework="$1"
  if ! grep -q "^import ${framework}\$" "$APPDELEGATE"; then
    awk -v imp="import ${framework}" '
      { print }
      /^import Capacitor/ && !done { print imp; done = 1 }
    ' "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
    mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
    echo "OK: added 'import ${framework}' to $APPDELEGATE"
  fi
}
remove_import() {
  local framework="$1"
  if grep -q "^import ${framework}\$" "$APPDELEGATE"; then
    grep -v "^import ${framework}\$" "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
    mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
    echo "OK: removed 'import ${framework}' from $APPDELEGATE"
  fi
}
insert_import_after_capacitor AVFoundation
insert_import_after_capacitor WebKit
insert_import_after_capacitor MetricKit
insert_import_after_capacitor WidgetKit
insert_import_after_capacitor UserNotifications
insert_import_after_capacitor AppIntents
insert_import_after_capacitor Network
insert_import_after_capacitor UniformTypeIdentifiers
insert_import_after_capacitor Security
insert_import_after_capacitor CryptoKit
insert_import_after_capacitor HealthKit
if [[ "$KOKORO_TTS_ENABLED" == "1" ]]; then
  insert_import_after_capacitor FluidAudio
  insert_import_after_capacitor MediaPlayer
else
  remove_import FluidAudio
  remove_import MediaPlayer
fi
