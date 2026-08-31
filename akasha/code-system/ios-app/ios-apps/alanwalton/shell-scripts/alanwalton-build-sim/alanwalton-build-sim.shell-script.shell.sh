#!/usr/bin/env bash
set -euo pipefail

export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"

BUNDLE_ID="${NATIVE_SHELL_BUNDLE_ID:?is unset. The ios-app page states bundle-id, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
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
  echo "       build-sim.sh is delivered by \`ops mobile sim install\`, which rsyncs the" >&2
  echo "       invoking working tree to this machine and names where it landed. This script" >&2
  echo "       reads no clone here, so there is nothing to fall back to. Do not run it standalone." >&2
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
[ -f www/index.html ] || {
  echo "ERROR: native-shell/www/index.html absent before cap sync — no SPA bundle to install." >&2
  echo "       Stage www/ from the working tree first; do NOT run build-sim.sh standalone" >&2
  echo "       without STAGED_WWW_DIR pointing at a staged bundle." >&2
  exit 1
}

if [ -d ios ]; then
  echo "==> cap sync + apply-ios-seam (ios:sync)..."
  npm run ios:sync
else
  echo "==> cap add ios + apply-ios-seam (ios:add; this tree carries no ios/ yet)..."
  npm run ios:add
fi

cd "$SHELL_DIR/ios/App"
echo "==> xcodebuild (simulator, unsigned)..."
xcodebuild -project App.xcodeproj -scheme App -configuration "$CONFIGURATION" \
  -destination "platform=iOS Simulator,id=$SIM_UDID" \
  -derivedDataPath build CODE_SIGNING_ALLOWED=NO \
  CURRENT_PROJECT_VERSION="$SIM_BUILD_NUMBER" build

APP="$SHELL_DIR/ios/App/build/Build/Products/${CONFIGURATION}-iphonesimulator/App.app"
[ -d "$APP" ] || { echo "ERROR: built app not found at $APP" >&2; exit 1; }

APPEX="$APP/PlugIns/ValuesWidgetExtension.appex"
if [ -d "$APPEX" ]; then
  APPEX_VERSION="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleVersion' "$APPEX/Info.plist" 2>/dev/null || true)"
  if [ -z "$APPEX_VERSION" ]; then
    echo "ERROR: the widget's CFBundleVersion is empty, so simctl will refuse this bundle." >&2
    echo "       CURRENT_PROJECT_VERSION did not reach the extension target — check apply-ios-seam.sh." >&2
    exit 1
  fi
  echo "==> Widget appex present, CFBundleVersion=$APPEX_VERSION (installing WITH the widget)"
else
  echo "ERROR: no ValuesWidgetExtension.appex in the built bundle — the widget target did not build." >&2
  exit 1
fi

echo "==> Ensuring simulator booted + installing..."
xcrun simctl bootstatus "$SIM_UDID" -b >/dev/null 2>&1 || xcrun simctl boot "$SIM_UDID"
xcrun simctl install "$SIM_UDID" "$APP"
echo "BUILD_SIM_OK bundle=$BUNDLE_ID udid=$SIM_UDID app=$APP"
