#!/usr/bin/env bash
set -euo pipefail

# Everything this seam READS stands in akasha and is found from this script.
# Everything it WRITES is under ios/, which belongs to the package it was run in
# and is reached from the working directory. Mixing the two is what broke when the
# package moved: paths written as "../../…" answered to the caller's cwd, not here.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IOS_APP_DIR="$(cd "$HERE/../../../.." && pwd)"
CODE_SYSTEM="$(cd "$IOS_APP_DIR/.." && pwd)"

PLIST="ios/App/App/Info.plist"
APPDELEGATE="ios/App/App/AppDelegate.swift"
CONFIG="ios/App/App/capacitor.config.json"
PB="/usr/libexec/PlistBuddy"

SHARED_WIDGET_SRC_DIR="$CODE_SYSTEM/ios-component/ios-components"
# Each thing this package builds is an akasha ios-program page, and the files Xcode
# reads by a fixed name stand beside that page under names the grammar builds.
PROGRAMS_DIR="$CODE_SYSTEM/ios-program/ios-programs"
WIDGET_PROGRAM="smilingjenny-widget"
APP_PROGRAM="smilingjenny-app"
WIDGET_INFO_PLIST="$PROGRAMS_DIR/$WIDGET_PROGRAM/$WIDGET_PROGRAM.ios-program.info-plist.plist"
SHARED_IOS_SEAM_DIR="$IOS_APP_DIR/shell-scripts"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/widget-components/widget-components.shell-script.shell.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/widget-components/widget-components.shell-script.shell.sh not found — the components this extension compiles could not be copied, and the extension would compile with no ring in it." >&2
  exit 1
fi
# shellcheck source=akasha/code-system/ios-apps/scripts/widget-components/widget-components.shell-script.shell.sh
. "$SHARED_IOS_SEAM_DIR/widget-components/widget-components.shell-script.shell.sh"
WIDGET_COMPONENTS="${NATIVE_SHELL_COMPONENTS:?is unset. The ios-app page names the components its widget extension compiles, and the ops mobile command running this build exports them. This script states no list of its own to fall back to.}"
WIDGET_NAME="${NATIVE_SHELL_WIDGET_NAME:?is unset. The widget program page states target-name, and whatever runs this build reads it off that page and exports it. This script states no name of its own to fall back to.}"
WIDGET_DEST="ios/App/${WIDGET_NAME}"
WIDGET_BUNDLE_ID="${NATIVE_SHELL_WIDGET_BUNDLE_ID:?is unset. The ios-app page states widget-bundle-id, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
WIDGET_TEAM="${NATIVE_SHELL_DEVELOPMENT_TEAM:?is unset. The ios-app page states development-team, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
WIDGET_DEPLOYMENT_TARGET="17.0"
WIDGET_PROFILE_NAME="${NATIVE_SHELL_WIDGET_PROFILE_NAME:?is unset. The ios-app page states widget-profile-name, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
APP_PROFILE_NAME="${NATIVE_SHELL_APP_PROFILE_NAME:?is unset. The ios-app page states app-profile-name, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
PROJECT_PBXPROJ="ios/App/App.xcodeproj"

WIDGET_ENABLED="${NATIVE_SHELL_WIDGET:-1}"

WIDGET_REFRESH_ENABLED="${NATIVE_SHELL_WIDGET_REFRESH:-1}"

MONARCH_TAP_ENABLED="${NATIVE_SHELL_MONARCH_TAP:-1}"

APS_ENABLED="${NATIVE_SHELL_APS:-1}"

ENTITLEMENTS_SRC="$PROGRAMS_DIR/$APP_PROGRAM/$APP_PROGRAM.ios-program.entitlements.entitlements"

if [[ ! -x "$PB" ]]; then
  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2
  exit 1
fi
if [[ ! -f "$PLIST" ]]; then
  echo "ERROR: $PLIST not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if [[ ! -f "$SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh not found — neither binary could be stamped, and an unstamped binary is refused at the upload gate." >&2
  exit 1
fi
# shellcheck source=akasha/code-system/ios-apps/scripts/build-stamp/build-stamp.shell-script.shell.sh
. "$SHARED_IOS_SEAM_DIR/build-stamp/build-stamp.shell-script.shell.sh"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/monarch-url/monarch-url.shell-script.shell.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/monarch-url/monarch-url.shell-script.shell.sh not found — the monarch-tap relay has no link to open, and appending it without one would emit Swift that does not compile." >&2
  exit 1
fi
# shellcheck source=akasha/code-system/ios-apps/scripts/monarch-url/monarch-url.shell-script.shell.sh
. "$SHARED_IOS_SEAM_DIR/monarch-url/monarch-url.shell-script.shell.sh"

"$PB" -c "Delete :ITSAppUsesNonExemptEncryption" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :ITSAppUsesNonExemptEncryption bool false" "$PLIST"
echo "OK: ITSAppUsesNonExemptEncryption=false applied to $PLIST"

if [[ "$WIDGET_ENABLED" != "1" ]]; then
  echo "OK: widget seam (§2) SKIPPED — NATIVE_SHELL_WIDGET=0."
else

if ! gem list -i xcodeproj >/dev/null 2>&1; then
  echo "OK: installing the xcodeproj gem (user-install) for the widget seam…"
  gem install --user-install xcodeproj
fi

mkdir -p "$WIDGET_DEST"
rm -f "$WIDGET_DEST"/*.swift "$WIDGET_DEST/Info.plist"
copy_widget_components "$SHARED_WIDGET_SRC_DIR" "$WIDGET_DEST" "$WIDGET_COMPONENTS"
if [[ ! -f "$WIDGET_INFO_PLIST" ]]; then
  echo "ERROR: $WIDGET_INFO_PLIST not found — the widget extension's Info.plist stands beside its akasha ios-program page, and Xcode has no target without it." >&2
  exit 1
fi
cp "$WIDGET_INFO_PLIST" "$WIDGET_DEST/Info.plist"
echo "OK: copied widget sources into $WIDGET_DEST"

native_shell_stamp_widget "$WIDGET_DEST"

# shellcheck source=akasha/code-system/ios-apps/pages/smilingjenny/scripts/widget-target/smilingjenny-widget-target.shell-script.shell.sh
. "$HERE/../smilingjenny-widget-target/smilingjenny-widget-target.shell-script.shell.sh"

fi

# shellcheck source=akasha/code-system/ios-apps/pages/smilingjenny/scripts/ios-seam-plugins/smilingjenny-ios-seam-plugins.shell-script.shell.sh
. "$HERE/../smilingjenny-ios-seam-plugins/smilingjenny-ios-seam-plugins.shell-script.shell.sh"

# shellcheck source=akasha/code-system/ios-apps/pages/smilingjenny/scripts/ring-credential/smilingjenny-ring-credential.shell-script.shell.sh
. "$HERE/../smilingjenny-ring-credential/smilingjenny-ring-credential.shell-script.shell.sh"

# shellcheck source=akasha/code-system/ios-apps/pages/smilingjenny/scripts/app-entitlements/smilingjenny-app-entitlements.shell-script.shell.sh
. "$HERE/../smilingjenny-app-entitlements/smilingjenny-app-entitlements.shell-script.shell.sh"

native_shell_stamp_app "$APPDELEGATE"
