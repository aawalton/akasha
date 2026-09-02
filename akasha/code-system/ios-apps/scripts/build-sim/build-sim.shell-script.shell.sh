#!/usr/bin/env bash
set -euo pipefail

export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"

BUNDLE_ID="${NATIVE_SHELL_BUNDLE_ID:?is unset. The ios-app page states bundle-id, and whatever runs this build reads it off that page and exports it. This script states no value of its own to fall back to.}"
APPEX_NAME="${NATIVE_SHELL_WIDGET_NAME:?is unset. The widget program page states target-name, and the built bundle is named for it. This script builds more than one app and states no name of its own to fall back to.}"
CONFIGURATION="${CONFIGURATION:-${2:-Debug}}"

SIM_BUILD_NUMBER="${SIM_BUILD_NUMBER:-1}"

SIM_UDID="${SIM_UDID:-${1:-}}"
if [ -z "$SIM_UDID" ]; then
  SIM_UDID="$(xcrun simctl list devices booted -j | python3 -c 'import sys,json; d=json.load(sys.stdin)["devices"]; ids=[x["udid"] for v in d.values() for x in v if x.get("state")=="Booted"]; print(ids[0] if ids else "")')"
fi
if [ -z "$SIM_UDID" ]; then
  SIM_UDID="$(xcrun simctl list devices available -j | python3 -c 'import sys,json; d=json.load(sys.stdin)["devices"]; ids=[x["udid"] for k,v in d.items() if "iOS" in k for x in v if "iPhone" in x.get("name","")]; print(ids[0] if ids else "")')"
fi
[ -n "$SIM_UDID" ] || { echo "ERROR: no simulator udid resolved (none booted, none available)." >&2; exit 1; }
echo "==> Target simulator: $SIM_UDID (configuration $CONFIGURATION)"

SHELL_DIR="${NATIVE_SHELL_DIR:-}"
[ -n "$SHELL_DIR" ] || {
  echo "ERROR: NATIVE_SHELL_DIR is unset, so this run has no tree of its own to compile." >&2
  echo "       This script is delivered by whatever runs the build, which rsyncs the" >&2
  echo "       invoking working tree to this machine and names where it landed. It reads" >&2
  echo "       no clone here, so there is nothing to fall back to. Do not run it standalone." >&2
  exit 1
}
[ -d "$SHELL_DIR" ] || {
  echo "ERROR: NATIVE_SHELL_DIR=$SHELL_DIR does not exist — the rsync that makes it did not run." >&2
  exit 1
}
cd "$SHELL_DIR"
echo "==> Building in $SHELL_DIR (rsynced from the invoking working tree by this run)"
npm install

if [ -n "${STAGED_WWW_DIR:-}" ]; then
  echo "==> Injecting staged www from $STAGED_WWW_DIR ..."
  rm -rf www
  mkdir -p www
  cp -R "$STAGED_WWW_DIR"/. www/
fi
if [ -d ios ]; then
  echo "==> cap sync + apply-ios-seam (ios:sync)..."
  npm run ios:sync
else
  echo "==> cap add ios + apply-ios-seam (ios:add; this tree carries no ios/ yet)..."
  npm run ios:add
fi

# After the package's own add/sync, because an app whose site is a page authored
# beside its akasha page stages that page from inside that call. Checked before it,
# such an app reads as having no site at all. Capacitor has copied webDir into the
# native project by now, so a miss here is still a miss before anything is built.
[ -f www/index.html ] || {
  echo "ERROR: no www/index.html in $SHELL_DIR after cap add/sync — nothing was copied" >&2
  echo "       into the native project, so this would build a shell opening a blank page." >&2
  echo "       Either the app stages its own web entry and that step did not run, or" >&2
  echo "       STAGED_WWW_DIR was to name a site built elsewhere and did not." >&2
  exit 1
}

cd "$SHELL_DIR/ios/App"
echo "==> xcodebuild (simulator, unsigned)..."
xcodebuild -project App.xcodeproj -scheme App -configuration "$CONFIGURATION" \
  -destination "platform=iOS Simulator,id=$SIM_UDID" \
  -derivedDataPath build CODE_SIGNING_ALLOWED=NO \
  CURRENT_PROJECT_VERSION="$SIM_BUILD_NUMBER" build

APP="$SHELL_DIR/ios/App/build/Build/Products/${CONFIGURATION}-iphonesimulator/App.app"
[ -d "$APP" ] || { echo "ERROR: built app not found at $APP" >&2; exit 1; }

APPEX="$APP/PlugIns/$APPEX_NAME.appex"
if [ -d "$APPEX" ]; then
  APPEX_VERSION="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleVersion' "$APPEX/Info.plist" 2>/dev/null || true)"
  if [ -z "$APPEX_VERSION" ]; then
    echo "ERROR: the widget's CFBundleVersion is empty, so simctl will refuse this bundle." >&2
    echo "       CURRENT_PROJECT_VERSION did not reach the extension target — check the seam." >&2
    exit 1
  fi
  echo "==> Widget appex present, CFBundleVersion=$APPEX_VERSION (installing WITH the widget)"
else
  echo "ERROR: no $APPEX_NAME.appex in the built bundle — the widget target did not build." >&2
  exit 1
fi

echo "==> Ensuring simulator booted + installing..."
xcrun simctl bootstatus "$SIM_UDID" -b >/dev/null 2>&1 || xcrun simctl boot "$SIM_UDID"
xcrun simctl install "$SIM_UDID" "$APP"
echo "BUILD_SIM_OK bundle=$BUNDLE_ID udid=$SIM_UDID app=$APP"
