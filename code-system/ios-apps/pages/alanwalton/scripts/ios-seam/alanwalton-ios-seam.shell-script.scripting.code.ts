import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { slugsIn } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "alanwalton-ios-seam"

const TYPE = "page-type"

const APP = "ios-app"

const ALAN = "alanwalton"

const PROGRAM = "ios-program"

const COMPONENT = "ios-component"

const COMPONENTS = "components"

const DRAWN = "alanwalton-widget"

const RUNNING = "alanwalton-app"

const SHELL = "shell"

const ICON = "icon"

const INFO_PLIST = "info-plist"

const ENTITLEMENTS = "entitlements"

const WIDGET_HELD = "$WIDGET_PROGRAM"

const APP_HELD = "$APP_PROGRAM"

const STAMPING = "build-stamp"

const LINKING = "monarch-url"

const COPYING = "widget-components"

const UP = ".."

const PARTED = "/"

const BEFORE = [
  "plist-keys",
  "appdelegate-imports",
  "seam-reset",
  "crash-capture",
  "native-audio",
  "kokoro-tts",
  "kokoro-synthesis",
  "keyboard-accessory-suppressor",
  "apns-forwarding",
  "widget-refresh",
  "badge",
  "wallpaper-intent",
  "health-samples-intent",
  "health-samples-drain",
  "app-shortcuts",
  "device-secret",
  "monarch-tap",
]

const AFTER = ["plugin-registrations", "fluidaudio-pin", "app-icon", "widget-target"]

const CLOSING = "app-entitlements"

function folderOf(path: string): string {
  return path.slice(0, path.lastIndexOf(PARTED))
}

function betweenAt(from: string, to: string): string {
  const leaving = from.split(PARTED)
  const reaching = to.split(PARTED)
  let same = 0
  while (same < leaving.length && same < reaching.length && leaving[same] === reaching[same]) {
    same += 1
  }
  return [...leaving.slice(same).map(() => UP), ...reaching.slice(same)].join(PARTED)
}

function shellAt(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

function besideAt(
  given: string | Reading,
  slug: string,
  propertySlug: string,
  programs: string,
  held: string
): string {
  const at = fileOf(given, valuedAt(given, PROGRAM, slug), PROGRAM, propertySlug)
  return betweenAt(programs, at).split(slug).join(held)
}

function placesIn(given: string | Reading) {
  const here = folderOf(valuedAt(given, SCRIPT, OWN).path)
  const app = valuedAt(given, APP, ALAN)
  const packaged = folderOf(app.path)
  const apps = folderOf(valuedAt(given, TYPE, APP).path)
  const code = folderOf(apps)
  const tiles = valuedAt(given, PROGRAM, DRAWN)
  const programs = folderOf(folderOf(tiles.path))
  const drawn = valuedAt(given, COMPONENT, slugsIn(tiles.value[exportedAs(COMPONENTS)])[0] ?? "")
  const seam = folderOf(folderOf(shellAt(given, STAMPING)))
  return {
    here,
    seam,
    scripts: folderOf(here),
    toPackage: betweenAt(here, packaged),
    toAppDir: betweenAt(packaged, apps),
    toCode: betweenAt(apps, code),
    components: betweenAt(code, folderOf(folderOf(drawn.path))),
    programs: betweenAt(code, programs),
    shared: betweenAt(code, seam),
    icon: betweenAt(packaged, fileOf(given, app, APP, ICON)),
    widgetInfoPlist: besideAt(given, DRAWN, INFO_PLIST, programs, WIDGET_HELD),
    widgetEntitlements: besideAt(given, DRAWN, ENTITLEMENTS, programs, WIDGET_HELD),
    appEntitlements: besideAt(given, RUNNING, ENTITLEMENTS, programs, APP_HELD),
  }
}

type Places = ReturnType<typeof placesIn>

function openingIn(places: Places): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# What this seam READS stands in akasha and is found from this script. What it",
    "# WRITES is under ios/, which belongs to the package it was run in and is reached",
    "# from the working directory. The two were one thing while this script sat beside",
    '# the manifest; the "../../" paths broke the moment the package moved, so they are',
    "# kept apart here.",
    'HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
    `PACKAGE="$(cd "$HERE/${places.toPackage}" && pwd)"`,
    `IOS_APP_DIR="$(cd "$PACKAGE/${places.toAppDir}" && pwd)"`,
    `AKASHA_HERE="$(cd "$IOS_APP_DIR/${places.toCode}" && pwd)"`,
    "# The 1024px app icon is a page property carried beside the app's page as base64",
    "# json, so no file in akasha holds a NUL byte. This writes the bytes back out and",
    "# refuses where the sha256 the carrier states is not what came out.",
    "carried_file_out() {",
    '  local carrier="$1" out="$2" b64 want have',
    '  b64="$(sed -n \'s/^  "base64": "\\(.*\\)"$/\\1/p\' "$carrier")"',
    '  want="$(sed -n \'s/^  "sha256": "\\(.*\\)",$/\\1/p\' "$carrier")"',
    '  if [[ -z "$b64" || -z "$want" ]]; then',
    '    echo "ERROR: $carrier carries no file — it names no base64 line and no sha256 line." >&2',
    "    return 1",
    "  fi",
    '  printf \'%s\' "$b64" | openssl base64 -d -A > "$out"',
    '  have="$(shasum -a 256 "$out" | cut -d\' \' -f1)"',
    '  if [[ "$want" != "$have" ]]; then',
    '    echo "ERROR: $carrier says its bytes are $want and what came out is $have." >&2',
    "    return 1",
    "  fi",
    "}",
    "",
  ]
}

function namingIn(places: Places): readonly string[] {
  return [
    'PLIST="ios/App/App/Info.plist"',
    'APPDELEGATE="ios/App/App/AppDelegate.swift"',
    'CONFIG="ios/App/App/capacitor.config.json"',
    'APPICONSET="ios/App/App/Assets.xcassets/AppIcon.appiconset"',
    `ICON_CARRIER="$PACKAGE/${places.icon}"`,
    'ICON_SOURCE="$(mktemp -d)/AppIcon-1024.png"',
    'PB="/usr/libexec/PlistBuddy"',
    "",
    "# The akasha sources this seam reads are found from this script; everything it",
    "# writes is under ios/ and reached from the working directory. This script has not",
    "# moved into akasha yet, so it reaches in from outside — which is the allowed",
    "# direction — rather than answering to whatever cwd the manifest was run in.",
    `SHARED_WIDGET_SRC_DIR="$AKASHA_HERE/${places.components}"`,
    "# Each thing this package builds is an akasha ios-program page, and the files Xcode",
    "# reads by a fixed name stand beside that page under names the grammar builds.",
    `PROGRAMS_DIR="$AKASHA_HERE/${places.programs}"`,
    `WIDGET_PROGRAM="${DRAWN}"`,
    `APP_PROGRAM="${RUNNING}"`,
    `WIDGET_INFO_PLIST="$PROGRAMS_DIR/${places.widgetInfoPlist}"`,
    `WIDGET_ENTITLEMENTS="$PROGRAMS_DIR/${places.widgetEntitlements}"`,
    `SHARED_IOS_SEAM_DIR="$AKASHA_HERE/${places.shared}"`,
  ]
}

function sharedIn(
  given: string | Reading,
  places: Places,
  slug: string,
  why: string
): readonly string[] {
  const at = shellAt(given, slug)
  const named = `$SHARED_IOS_SEAM_DIR/${betweenAt(places.seam, at)}`
  return [
    `if [[ ! -f "${named}" ]]; then`,
    `  echo "ERROR: ${named} not found — ${why}" >&2`,
    "  exit 1",
    "fi",
    `# shellcheck source=${betweenAt(places.here, at)}`,
    `. "${named}"`,
  ]
}

function settingIn(places: Places): readonly string[] {
  return [
    'WIDGET_COMPONENTS="${NATIVE_SHELL_COMPONENTS:?is unset. The ios-app page names the components its widget extension compiles, and whatever runs this build exports them. This script states no list of its own to fall back to.}"',
    'WIDGET_NAME="${NATIVE_SHELL_WIDGET_NAME:?is unset. The widget program page states target-name, and whatever runs this build reads it off that page and exports it. This script states no name of its own to fall back to.}"',
    'WIDGET_DEST="ios/App/${WIDGET_NAME}"',
    'WIDGET_BUNDLE_ID="${NATIVE_SHELL_WIDGET_BUNDLE_ID:?is unset. The ios-app page states widget-bundle-id, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'WIDGET_TEAM="${NATIVE_SHELL_DEVELOPMENT_TEAM:?is unset. The ios-app page states development-team, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'WIDGET_DEPLOYMENT_TARGET="17.0"',
    'WIDGET_PROFILE_NAME="${NATIVE_SHELL_WIDGET_PROFILE_NAME:?is unset. The ios-app page states widget-profile-name, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'APP_PROFILE_NAME="${NATIVE_SHELL_APP_PROFILE_NAME:?is unset. The ios-app page states app-profile-name, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'KEYCHAIN_ACCESS_GROUP="${NATIVE_SHELL_KEYCHAIN_ACCESS_GROUP:?is unset. The ios-app page states development-team and bundle-id, and whatever runs this build joins them into the access group and exports it. This script states no value of its own to fall back to.}"',
    'DEVICE_SECRET_SERVICE="${NATIVE_SHELL_DEVICE_SECRET_SERVICE:?is unset. The ios-app page states bundle-id, and whatever runs this build derives the device secret service from it and exports it. This script states no value of its own to fall back to.}"',
    'PROJECT_PBXPROJ="ios/App/App.xcodeproj"',
    "",
    'WIDGET_ENABLED="${NATIVE_SHELL_WIDGET:-1}"',
    "",
    'KEYBOARD_SUPPRESS_ENABLED="${NATIVE_SHELL_KEYBOARD_SUPPRESS:-1}"',
    "",
    'APS_ENABLED="${NATIVE_SHELL_APS:-1}"',
    `ENTITLEMENTS_SRC="$PROGRAMS_DIR/${places.appEntitlements}"`,
    "",
    'HEALTHKIT_ENABLED="${NATIVE_SHELL_HEALTHKIT:-1}"',
    'HEALTH_SHARE_DESC="alanwalton reads your Active Energy from the Health app so your daily calorie burn is tracked automatically, without you entering it by hand."',
    'HEALTH_UPDATE_DESC="alanwalton does not add any data to the Health app — it only reads your Active Energy so your daily calorie burn is tracked automatically."',
    "",
    'WIDGET_REFRESH_ENABLED="${NATIVE_SHELL_WIDGET_REFRESH:-1}"',
    "",
    'MONARCH_TAP_ENABLED="${NATIVE_SHELL_MONARCH_TAP:-1}"',
    "",
    'BADGE_RESYNC_ENABLED="${NATIVE_SHELL_BADGE_RESYNC:-1}"',
    "",
    'DEVICE_SECRET_ENABLED="${NATIVE_SHELL_DEVICE_SECRET:-1}"',
    "",
    'WALLPAPER_INTENT_ENABLED="${NATIVE_SHELL_WALLPAPER_INTENT:-1}"',
    "",
    'HEALTH_SAMPLES_INTENT_ENABLED="${NATIVE_SHELL_HEALTH_SAMPLES_INTENT:-1}"',
    "",
    'KOKORO_TTS_ENABLED="${NATIVE_SHELL_KOKORO_TTS:-1}"',
    'KOKORO_FLUIDAUDIO_URL="https://github.com/FluidInference/FluidAudio.git"',
    'KOKORO_FLUIDAUDIO_REVISION="300165b240c45375add402265f62410b6df33cf1"',
    "",
    'URL_SCHEME_ENABLED="${NATIVE_SHELL_URL_SCHEME:-1}"',
    'URL_SCHEME="alanwalton"',
    'URL_SCHEME_NAME="${NATIVE_SHELL_BUNDLE_ID:?is unset. The ios-app page states bundle-id, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    "",
  ]
}

function guardingIn(): readonly string[] {
  return [
    'if [[ ! -x "$PB" ]]; then',
    '  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2',
    "  exit 1",
    "fi",
    'if [[ ! -f "$PLIST" ]]; then',
    "  echo \"ERROR: $PLIST not found — run 'npx cap add ios' first.\" >&2",
    "  exit 1",
    "fi",
    'if [[ ! -f "$APPDELEGATE" ]]; then',
    "  echo \"ERROR: $APPDELEGATE not found — run 'npx cap add ios' first.\" >&2",
    "  exit 1",
    "fi",
    'if [[ ! -f "$CONFIG" ]]; then',
    "  echo \"ERROR: $CONFIG not found — run 'npx cap add ios' first.\" >&2",
    "  exit 1",
    "fi",
    'if [[ ! -f "$ICON_CARRIER" ]]; then',
    '  echo "ERROR: $ICON_CARRIER not found — the 1024 app icon is carried there as base64 json." >&2',
    "  exit 1",
    "fi",
    'carried_file_out "$ICON_CARRIER" "$ICON_SOURCE"',
    'if [[ "$WIDGET_ENABLED" == "1" ]]; then',
    '  if [[ ! -f "$WIDGET_INFO_PLIST" ]]; then',
    '    echo "ERROR: $WIDGET_INFO_PLIST not found — the widget extension\'s Info.plist stands beside its akasha ios-program page, and Xcode has no target without it. Its Swift stands in akasha too, as ios-component pages, and copy_widget_components refuses on its own if one the program names is missing." >&2',
    "    exit 1",
    "  fi",
    '  if [[ ! -d "$PROJECT_PBXPROJ" ]]; then',
    "    echo \"ERROR: $PROJECT_PBXPROJ not found — run 'npx cap add ios' first.\" >&2",
    "    exit 1",
    "  fi",
    "fi",
    "",
  ]
}

function sourcedIn(given: string | Reading, places: Places, part: string): readonly string[] {
  const at = shellAt(given, `${ALAN}-${part}`)
  return [
    `# shellcheck source=${betweenAt(places.here, at)}`,
    `. "$SEAM_DIR/${betweenAt(places.scripts, at)}"`,
  ]
}

function closingIn(given: string | Reading, places: Places): readonly string[] {
  return [
    `SEAM_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")/${betweenAt(places.here, places.scripts)}" && pwd)"`,
    ...BEFORE.flatMap((one) => sourcedIn(given, places, one)),
    "",
    "# Where 09-monarch-tap-and-build-stamp.sh called it, between the relay and the",
    "# registrations. The sibling shell calls it from its own seam too.",
    'native_shell_stamp_app "$APPDELEGATE"',
    "",
    ...AFTER.flatMap((one) => sourcedIn(given, places, one)),
    "",
    ...sourcedIn(given, places, CLOSING),
    "",
    'echo "Next: open the project in Xcode (npm run ios:open), select your free"',
    'echo "Apple ID signing team, plug in the iPhone, and Run."',
  ]
}

export function bodyIn(given: string | Reading): string {
  const places = placesIn(given)
  const lines = [
    ...openingIn(places),
    ...namingIn(places),
    ...sharedIn(
      given,
      places,
      STAMPING,
      "neither binary could be stamped, and an unstamped binary is refused at the upload gate."
    ),
    ...sharedIn(
      given,
      places,
      LINKING,
      "the monarch-tap relay has no link to open, and appending it without one would emit Swift that does not compile."
    ),
    ...sharedIn(
      given,
      places,
      COPYING,
      "the components this extension compiles could not be copied, and the extension would compile with no ring in it."
    ),
    ...settingIn(places),
    ...guardingIn(),
    ...closingIn(given, places),
  ]
  return `${lines.join("\n")}\n`
}
