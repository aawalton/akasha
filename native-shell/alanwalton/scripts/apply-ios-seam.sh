#!/usr/bin/env bash
set -euo pipefail

PLIST="ios/App/App/Info.plist"
APPDELEGATE="ios/App/App/AppDelegate.swift"
CONFIG="ios/App/App/capacitor.config.json"
APPICONSET="ios/App/App/Assets.xcassets/AppIcon.appiconset"
ICON_SOURCE="ios-icon/AppIcon-1024.png"
PB="/usr/libexec/PlistBuddy"

WIDGET_SRC_DIR="ios-widget"
SHARED_WIDGET_SRC_DIR="../../akasha/code-system/ios-component/ios-components"
SHARED_IOS_SEAM_DIR="../../ios-seam"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/build-stamp.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/build-stamp.sh not found — neither binary could be stamped, and an unstamped binary is refused at the upload gate." >&2
  exit 1
fi
# shellcheck source=ios-seam/build-stamp.sh
. "$SHARED_IOS_SEAM_DIR/build-stamp.sh"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/monarch-url.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/monarch-url.sh not found — the monarch-tap relay has no link to open, and appending it without one would emit Swift that does not compile." >&2
  exit 1
fi
# shellcheck source=ios-seam/monarch-url.sh
. "$SHARED_IOS_SEAM_DIR/monarch-url.sh"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/widget-components.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/widget-components.sh not found — the components this extension compiles could not be copied, and the extension would compile with no ring in it." >&2
  exit 1
fi
# shellcheck source=ios-seam/widget-components.sh
. "$SHARED_IOS_SEAM_DIR/widget-components.sh"
WIDGET_COMPONENTS="${NATIVE_SHELL_COMPONENTS:?is unset. The ios-app page names the components its widget extension compiles, and the ops mobile command running this build exports them. This script states no list of its own to fall back to.}"
WIDGET_NAME="ValuesWidgetExtension"
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
ENTITLEMENTS_SRC="ios-app/App.entitlements"

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
if [[ ! -f "$ICON_SOURCE" ]]; then
  echo "ERROR: $ICON_SOURCE not found — the committed 1024 app icon is missing." >&2
  exit 1
fi
if [[ "$WIDGET_ENABLED" == "1" ]]; then
  if [[ ! -f "$WIDGET_SRC_DIR/ValuesStoplightsWidget.swift" || ! -f "$WIDGET_SRC_DIR/ClaudeUsageWidget.swift" || ! -f "$WIDGET_SRC_DIR/Info.plist" ]]; then
    echo "ERROR: $WIDGET_SRC_DIR/{ValuesStoplightsWidget.swift,ClaudeUsageWidget.swift,Info.plist} not found — the committed widget seam is missing." >&2
    exit 1
  fi
  if [[ ! -d "$PROJECT_PBXPROJ" ]]; then
    echo "ERROR: $PROJECT_PBXPROJ not found — run 'npx cap add ios' first." >&2
    exit 1
  fi
fi

SEAM_DIR="$(dirname "${BASH_SOURCE[0]}")/ios-seam"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/01-plist-keys.sh
. "$SEAM_DIR/01-plist-keys.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/02-webview-and-audio.sh
. "$SEAM_DIR/02-webview-and-audio.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/03-kokoro-tts.sh
. "$SEAM_DIR/03-kokoro-tts.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/04-kokoro-tts-synthesis.sh
. "$SEAM_DIR/04-kokoro-tts-synthesis.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/05-plugins.sh
. "$SEAM_DIR/05-plugins.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/06-health-samples-intent.sh
. "$SEAM_DIR/06-health-samples-intent.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/07-health-samples-drain.sh
. "$SEAM_DIR/07-health-samples-drain.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/08-shortcuts-and-keychain.sh
. "$SEAM_DIR/08-shortcuts-and-keychain.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/09-monarch-tap-and-build-stamp.sh
. "$SEAM_DIR/09-monarch-tap-and-build-stamp.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/10-xcode-project.sh
. "$SEAM_DIR/10-xcode-project.sh"

ENTITLEMENTS_DEST="ios/App/App/App.entitlements"
APS_SEAM_RB=$(mktemp)
cat > "$APS_SEAM_RB" <<'RUBY'
require "xcodeproj"

project_path     = ENV.fetch("PROJECT_PBXPROJ")
entitlements_rel = "App/App.entitlements" # relative to ios/App (the project dir)

project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |t| t.name == "App" }
abort("App target not found in #{project_path}") unless app

# Clear any prior reference first so a re-run never duplicates it. The App group maps
# to ios/App/App where the .entitlements is copied.
group = project.main_group.find_subpath("App", true)
group.files.select { |f| f.path == "App.entitlements" }.each(&:remove_from_project)

app.build_configurations.each { |c| c.build_settings["CODE_SIGN_ENTITLEMENTS"] = entitlements_rel }
group.new_reference("App.entitlements") # visible in Xcode; not compiled
puts "OK: set CODE_SIGN_ENTITLEMENTS=#{entitlements_rel} on the App target in #{project_path}"

project.save
RUBY

if [[ ! -f "$ENTITLEMENTS_SRC" ]]; then
  echo "ERROR: $ENTITLEMENTS_SRC not found — the committed App entitlements are missing." >&2
  exit 1
fi
if [[ ! -d "$PROJECT_PBXPROJ" ]]; then
  echo "ERROR: $PROJECT_PBXPROJ not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if ! gem list -i xcodeproj >/dev/null 2>&1; then
  echo "OK: installing the xcodeproj gem (user-install) for the entitlement seam…"
  gem install --user-install xcodeproj
fi

cp "$ENTITLEMENTS_SRC" "$ENTITLEMENTS_DEST"
if [[ "$APS_ENABLED" != "1" ]]; then
  "$PB" -c "Delete :aps-environment" "$ENTITLEMENTS_DEST" 2>/dev/null || true
  echo "OK: aps-environment entitlement SKIPPED — NATIVE_SHELL_APS=0 (key removed)."
fi
if [[ "$HEALTHKIT_ENABLED" != "1" ]]; then
  "$PB" -c "Delete :com.apple.developer.healthkit" "$ENTITLEMENTS_DEST" 2>/dev/null || true
  echo "OK: HealthKit entitlement SKIPPED — NATIVE_SHELL_HEALTHKIT=0 (key removed)."
fi
echo "OK: composed App entitlements into $ENTITLEMENTS_DEST"
PROJECT_PBXPROJ="$PROJECT_PBXPROJ" ruby "$APS_SEAM_RB"
rm -f "$APS_SEAM_RB"

echo "Next: open the project in Xcode (npm run ios:open), select your free"
echo "Apple ID signing team, plug in the iPhone, and Run."
