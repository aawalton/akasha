#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 02-webview-and-audio.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
CRASH_MARKER='// ===== native crash-capture seam'
SHIM_MARKER='// ===== offline-audio native playback shim'
ACCESSORY_MARKER='// ===== keyboard-accessory suppressor seam'
WIDGET_REFRESH_MARKER='// ===== widget-refresh-on-foreground seam'
KOKORO_MARKER='// ===== kokoro-tts on-device synthesis seam'
WALLPAPER_INTENT_MARKER='// ===== get-wallpaper app intent seam'
ACTIVE_ENERGY_INTENT_MARKER='// ===== sync-active-energy app intent seam'
HEALTH_SAMPLES_INTENT_MARKER='// ===== stream-health-samples app intent seam'
APP_SHORTCUTS_PROVIDER_MARKER='// ===== app shortcuts provider seam'
DEVICE_SECRET_MARKER='// ===== device-secret keychain seam'
MONARCH_TAP_MARKER='// ===== monarch-tap relay seam'
BUILD_STAMP_MARKER='// ===== build stamp seam'
FIRST_SEAM_LINE=$(grep -nF -e "$CRASH_MARKER" -e "$SHIM_MARKER" -e "$ACCESSORY_MARKER" -e "$WIDGET_REFRESH_MARKER" -e "$KOKORO_MARKER" -e "$WALLPAPER_INTENT_MARKER" -e "$ACTIVE_ENERGY_INTENT_MARKER" -e "$HEALTH_SAMPLES_INTENT_MARKER" -e "$APP_SHORTCUTS_PROVIDER_MARKER" -e "$DEVICE_SECRET_MARKER" -e "$MONARCH_TAP_MARKER" -e "$BUILD_STAMP_MARKER" "$APPDELEGATE" | head -1 | cut -d: -f1 || true)
if [[ -n "$FIRST_SEAM_LINE" ]]; then
  head -n "$((FIRST_SEAM_LINE - 1))" "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
  mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
  echo "OK: stripped previously-applied seam classes from $APPDELEGATE"
fi
awk 'NF{last=NR} {line[NR]=$0} END{for (i=1;i<=last;i++) print line[i]}' \
  "$APPDELEGATE" > "$APPDELEGATE.seam.tmp"
mv "$APPDELEGATE.seam.tmp" "$APPDELEGATE"
