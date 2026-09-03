#!/usr/bin/env bash
set -euo pipefail

# What this seam READS stands in akasha and is found from this script. What it
# WRITES is under ios/, which belongs to the package it was run in and is reached
# from the working directory. The two were one thing while this script sat beside
# the manifest; the "../../" paths broke the moment the package moved, so they are
# kept apart here.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE="$(cd "$HERE/../.." && pwd)"
IOS_APP_DIR="$(cd "$PACKAGE/../.." && pwd)"
AKASHA_HERE="$(cd "$IOS_APP_DIR/.." && pwd)"
# The 1024px app icon is a page property carried beside the app's page as base64
# json, so no file in akasha holds a NUL byte. This writes the bytes back out and
# refuses where the sha256 the carrier states is not what came out.
carried_file_out() {
  local carrier="$1" out="$2" b64 want have
  b64="$(sed -n 's/^  "base64": "\(.*\)"$/\1/p' "$carrier")"
  want="$(sed -n 's/^  "sha256": "\(.*\)",$/\1/p' "$carrier")"
  if [[ -z "$b64" || -z "$want" ]]; then
    echo "ERROR: $carrier carries no file — it names no base64 line and no sha256 line." >&2
    return 1
  fi
  printf '%s' "$b64" | openssl base64 -d -A > "$out"
  have="$(shasum -a 256 "$out" | cut -d' ' -f1)"
  if [[ "$want" != "$have" ]]; then
    echo "ERROR: $carrier says its bytes are $want and what came out is $have." >&2
    return 1
  fi
}

PLIST="ios/App/App/Info.plist"
APPDELEGATE="ios/App/App/AppDelegate.swift"
CONFIG="ios/App/App/capacitor.config.json"
APPICONSET="ios/App/App/Assets.xcassets/AppIcon.appiconset"
ICON_CARRIER="$PACKAGE/alanwalton.ios-app.icon.json"
ICON_SOURCE="$(mktemp -d)/AppIcon-1024.png"
PB="/usr/libexec/PlistBuddy"

# The akasha sources this seam reads are found from this script; everything it
# writes is under ios/ and reached from the working directory. This script has not
# moved into akasha yet, so it reaches in from outside — which is the allowed
# direction — rather than answering to whatever cwd the manifest was run in.
SHARED_WIDGET_SRC_DIR="$AKASHA_HERE/ios-component/ios-components"
# Each thing this package builds is an akasha ios-program page, and the files Xcode
# reads by a fixed name stand beside that page under names the grammar builds.
PROGRAMS_DIR="$AKASHA_HERE/ios-program/ios-programs"
WIDGET_PROGRAM="alanwalton-widget"
APP_PROGRAM="alanwalton-app"
WIDGET_INFO_PLIST="$PROGRAMS_DIR/$WIDGET_PROGRAM/$WIDGET_PROGRAM.ios-program.info-plist.plist"
WIDGET_ENTITLEMENTS="$PROGRAMS_DIR/$WIDGET_PROGRAM/$WIDGET_PROGRAM.ios-program.entitlements.entitlements"
SHARED_IOS_SEAM_DIR="$AKASHA_HERE/ios-app/shell-scripts"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh not found — neither binary could be stamped, and an unstamped binary is refused at the upload gate." >&2
  exit 1
fi
# shellcheck source=akasha/code-system/ios-app/shell-scripts/build-stamp/build-stamp.shell-script.shell.sh
. "$SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/monarch-url/monarch-url.shell-script.shell.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/monarch-url/monarch-url.shell-script.shell.sh not found — the monarch-tap relay has no link to open, and appending it without one would emit Swift that does not compile." >&2
  exit 1
fi
# shellcheck source=akasha/code-system/ios-app/shell-scripts/monarch-url/monarch-url.shell-script.shell.sh
. "$SHARED_IOS_SEAM_DIR/monarch-url/monarch-url.shell-script.shell.sh"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/widget-components/widget-components.shell-script.shell.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/widget-components/widget-components.shell-script.shell.sh not found — the components this extension compiles could not be copied, and the extension would compile with no ring in it." >&2
  exit 1
fi
# shellcheck source=akasha/code-system/ios-app/shell-scripts/widget-components/widget-components.shell-script.shell.sh
. "$SHARED_IOS_SEAM_DIR/widget-components/widget-components.shell-script.shell.sh"
WIDGET_COMPONENTS="${NATIVE_SHELL_COMPONENTS:?is unset. The ios-app page names the components its widget extension compiles, and the ops mobile command running this build exports them. This script states no list of its own to fall back to.}"
WIDGET_NAME="${NATIVE_SHELL_WIDGET_NAME:?is unset. The widget program page states target-name, and whatever runs this build reads it off that page and exports it. This script states no name of its own to fall back to.}"
WIDGET_DEST="ios/App/${WIDGET_NAME}"
WIDGET_BUNDLE_ID="${NATIVE_SHELL_WIDGET_BUNDLE_ID:?is unset. The ios-app page states widget-bundle-id, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
WIDGET_TEAM="${NATIVE_SHELL_DEVELOPMENT_TEAM:?is unset. The ios-app page states development-team, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
WIDGET_DEPLOYMENT_TARGET="17.0"
WIDGET_PROFILE_NAME="${NATIVE_SHELL_WIDGET_PROFILE_NAME:?is unset. The ios-app page states widget-profile-name, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
APP_PROFILE_NAME="${NATIVE_SHELL_APP_PROFILE_NAME:?is unset. The ios-app page states app-profile-name, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
KEYCHAIN_ACCESS_GROUP="${NATIVE_SHELL_KEYCHAIN_ACCESS_GROUP:?is unset. The ios-app page states development-team and bundle-id, and the ops mobile command running this build joins them into the access group and exports it. This script states no value of its own to fall back to.}"
DEVICE_SECRET_SERVICE="${NATIVE_SHELL_DEVICE_SECRET_SERVICE:?is unset. The ios-app page states bundle-id, and the ops mobile command running this build derives the device secret service from it and exports it. This script states no value of its own to fall back to.}"
PROJECT_PBXPROJ="ios/App/App.xcodeproj"

WIDGET_ENABLED="${NATIVE_SHELL_WIDGET:-1}"

KEYBOARD_SUPPRESS_ENABLED="${NATIVE_SHELL_KEYBOARD_SUPPRESS:-1}"

APS_ENABLED="${NATIVE_SHELL_APS:-1}"
ENTITLEMENTS_SRC="$PROGRAMS_DIR/$APP_PROGRAM/$APP_PROGRAM.ios-program.entitlements.entitlements"

HEALTHKIT_ENABLED="${NATIVE_SHELL_HEALTHKIT:-1}"
HEALTH_SHARE_DESC="alanwalton reads your Active Energy from the Health app so your daily calorie burn is tracked automatically, without you entering it by hand."
HEALTH_UPDATE_DESC="alanwalton does not add any data to the Health app — it only reads your Active Energy so your daily calorie burn is tracked automatically."

WIDGET_REFRESH_ENABLED="${NATIVE_SHELL_WIDGET_REFRESH:-1}"

MONARCH_TAP_ENABLED="${NATIVE_SHELL_MONARCH_TAP:-1}"

BADGE_RESYNC_ENABLED="${NATIVE_SHELL_BADGE_RESYNC:-1}"

DEVICE_SECRET_ENABLED="${NATIVE_SHELL_DEVICE_SECRET:-1}"

WALLPAPER_INTENT_ENABLED="${NATIVE_SHELL_WALLPAPER_INTENT:-1}"

HEALTH_SAMPLES_INTENT_ENABLED="${NATIVE_SHELL_HEALTH_SAMPLES_INTENT:-1}"

KOKORO_TTS_ENABLED="${NATIVE_SHELL_KOKORO_TTS:-1}"
KOKORO_FLUIDAUDIO_URL="https://github.com/FluidInference/FluidAudio.git"
KOKORO_FLUIDAUDIO_REVISION="300165b240c45375add402265f62410b6df33cf1"

URL_SCHEME_ENABLED="${NATIVE_SHELL_URL_SCHEME:-1}"
URL_SCHEME="alanwalton"
URL_SCHEME_NAME="${NATIVE_SHELL_BUNDLE_ID:?is unset. The ios-app page states bundle-id, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"

if [[ ! -x "$PB" ]]; then
  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2
  exit 1
fi
if [[ ! -f "$PLIST" ]]; then
  echo "ERROR: $PLIST not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if [[ ! -f "$APPDELEGATE" ]]; then
  echo "ERROR: $APPDELEGATE not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if [[ ! -f "$CONFIG" ]]; then
  echo "ERROR: $CONFIG not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if [[ ! -f "$ICON_CARRIER" ]]; then
  echo "ERROR: $ICON_CARRIER not found — the 1024 app icon is carried there as base64 json." >&2
  exit 1
fi
carried_file_out "$ICON_CARRIER" "$ICON_SOURCE"
if [[ "$WIDGET_ENABLED" == "1" ]]; then
  if [[ ! -f "$WIDGET_INFO_PLIST" ]]; then
    echo "ERROR: $WIDGET_INFO_PLIST not found — the widget extension's Info.plist stands beside its akasha ios-program page, and Xcode has no target without it. Its Swift stands in akasha too, as ios-component pages, and copy_widget_components refuses on its own if one the program names is missing." >&2
    exit 1
  fi
  if [[ ! -d "$PROJECT_PBXPROJ" ]]; then
    echo "ERROR: $PROJECT_PBXPROJ not found — run 'npx cap add ios' first." >&2
    exit 1
  fi
fi

SEAM_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-plist-keys/alanwalton-plist-keys.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-plist-keys/alanwalton-plist-keys.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-appdelegate-imports/alanwalton-appdelegate-imports.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-appdelegate-imports/alanwalton-appdelegate-imports.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-seam-reset/alanwalton-seam-reset.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-seam-reset/alanwalton-seam-reset.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-crash-capture/alanwalton-crash-capture.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-crash-capture/alanwalton-crash-capture.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-native-audio/alanwalton-native-audio.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-native-audio/alanwalton-native-audio.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-kokoro-tts/alanwalton-kokoro-tts.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-kokoro-tts/alanwalton-kokoro-tts.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-kokoro-synthesis/alanwalton-kokoro-synthesis.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-kokoro-synthesis/alanwalton-kokoro-synthesis.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-keyboard-accessory-suppressor/alanwalton-keyboard-accessory-suppressor.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-keyboard-accessory-suppressor/alanwalton-keyboard-accessory-suppressor.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-apns-forwarding/alanwalton-apns-forwarding.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-apns-forwarding/alanwalton-apns-forwarding.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-widget-refresh/alanwalton-widget-refresh.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-widget-refresh/alanwalton-widget-refresh.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-badge/alanwalton-badge.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-badge/alanwalton-badge.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-wallpaper-intent/alanwalton-wallpaper-intent.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-wallpaper-intent/alanwalton-wallpaper-intent.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-health-samples-intent/alanwalton-health-samples-intent.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-health-samples-intent/alanwalton-health-samples-intent.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-health-samples-drain/alanwalton-health-samples-drain.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-health-samples-drain/alanwalton-health-samples-drain.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-app-shortcuts/alanwalton-app-shortcuts.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-app-shortcuts/alanwalton-app-shortcuts.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-device-secret/alanwalton-device-secret.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-device-secret/alanwalton-device-secret.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-monarch-tap/alanwalton-monarch-tap.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-monarch-tap/alanwalton-monarch-tap.shell-script.shell.sh"

# Where 09-monarch-tap-and-build-stamp.sh called it, between the relay and the
# registrations. The sibling shell calls it from its own seam too.
native_shell_stamp_app "$APPDELEGATE"

# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-plugin-registrations/alanwalton-plugin-registrations.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-plugin-registrations/alanwalton-plugin-registrations.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-fluidaudio-pin/alanwalton-fluidaudio-pin.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-fluidaudio-pin/alanwalton-fluidaudio-pin.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-app-icon/alanwalton-app-icon.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-app-icon/alanwalton-app-icon.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-widget-target/alanwalton-widget-target.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-widget-target/alanwalton-widget-target.shell-script.shell.sh"

# shellcheck source=akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-app-entitlements/alanwalton-app-entitlements.shell-script.shell.sh
. "$SEAM_DIR/alanwalton-app-entitlements/alanwalton-app-entitlements.shell-script.shell.sh"

echo "Next: open the project in Xcode (npm run ios:open), select your free"
echo "Apple ID signing team, plug in the iPhone, and Run."
