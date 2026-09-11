import { basename, dirname, relative } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const TYPE = "page-type"

const PROGRAM = "ios-program"

const COMPONENT = "ios-component"

const APP_TYPE = "ios-app"

const SHELL = "shell"

const INFO_PLIST = "info-plist"

const ENTITLEMENTS = "entitlements"

const OWN = "smilingjenny-ios-seam"

const APP = "smilingjenny"

const WIDGET = "-widget"

const MAIN = "-app"

const TARGET = "-widget-target"

const PLUGINS = "-ios-seam-plugins"

const CREDENTIAL = "-ring-credential"

const ENTITLING = "-app-entitlements"

const COMPONENTS = "widget-components"

const STAMP = "build-stamp"

const MONARCH = "monarch-url"

const WHY_COMPONENTS =
  "the components this extension compiles could not be copied, and the extension would compile with no ring in it."

const WHY_STAMP =
  "neither binary could be stamped, and an unstamped binary is refused at the upload gate."

const WHY_MONARCH =
  "the monarch-tap relay has no link to open, and appending it without one would emit Swift that does not compile."

type Under = {
  readonly here: string
  readonly apps: string
  readonly system: string
  readonly scripts: string
}

function underOf(given: string | Reading, pageTypeSlug: string): string {
  const found = new Set(valuesOfType(given, pageTypeSlug).map((one) => dirname(dirname(one.path))))
  const [only] = [...found]
  if (only === undefined || found.size > 1) {
    throw new Error(`the \`${pageTypeSlug}\` pages sit in ${found.size} folders rather than in one`)
  }
  return only
}

function shellOf(given: string | Reading, slug: string): string {
  return fileOf(given, valuedAt(given, SCRIPT, slug), SCRIPT, SHELL)
}

function tailOf(given: string | Reading, slug: string, propertySlug: string): string {
  const at = fileOf(given, valuedAt(given, PROGRAM, slug), PROGRAM, propertySlug)
  return basename(at).slice(slug.length)
}

function sharedIn(
  given: string | Reading,
  under: Under,
  slug: string,
  why: string
): readonly string[] {
  const at = shellOf(given, slug)
  const said = relative(under.scripts, at)
  return [
    `if [[ ! -f "$SHARED_IOS_SEAM_DIR/${said}" ]]; then`,
    `  echo "ERROR: $SHARED_IOS_SEAM_DIR/${said} not found — ${why}" >&2`,
    "  exit 1",
    "fi",
    `# shellcheck source=${relative(under.here, at)}`,
    `. "$SHARED_IOS_SEAM_DIR/${said}"`,
  ]
}

function besideIn(given: string | Reading, under: Under, name: string): readonly string[] {
  const said = relative(under.here, shellOf(given, `${APP}${name}`))
  return [`# shellcheck source=${said}`, `. "$HERE/${said}"`]
}

function opening(under: Under): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# Everything this seam READS stands in akasha and is found from this script.",
    "# Everything it WRITES is under ios/, which belongs to the package it was run in",
    "# and is reached from the working directory. Mixing the two is what broke when the",
    '# package moved: paths written as "../../…" answered to the caller\'s cwd, not here.',
    'HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
    `IOS_APP_DIR="$(cd "$HERE/${relative(under.here, under.apps)}" && pwd)"`,
    `CODE_SYSTEM="$(cd "$IOS_APP_DIR/${relative(under.apps, under.system)}" && pwd)"`,
    "",
    'PLIST="ios/App/App/Info.plist"',
    'APPDELEGATE="ios/App/App/AppDelegate.swift"',
    'CONFIG="ios/App/App/capacitor.config.json"',
    'PB="/usr/libexec/PlistBuddy"',
    "",
  ]
}

function naming(given: string | Reading, under: Under): readonly string[] {
  const widget = `${APP}${WIDGET}`
  return [
    `SHARED_WIDGET_SRC_DIR="$CODE_SYSTEM/${relative(under.system, underOf(given, COMPONENT))}"`,
    "# Each thing this package builds is an akasha ios-program page, and the files Xcode",
    "# reads by a fixed name stand beside that page under names the grammar builds.",
    `PROGRAMS_DIR="$CODE_SYSTEM/${relative(under.system, underOf(given, PROGRAM))}"`,
    `WIDGET_PROGRAM="${widget}"`,
    `APP_PROGRAM="${APP}${MAIN}"`,
    `WIDGET_INFO_PLIST="$PROGRAMS_DIR/$WIDGET_PROGRAM/$WIDGET_PROGRAM${tailOf(given, widget, INFO_PLIST)}"`,
    `SHARED_IOS_SEAM_DIR="$IOS_APP_DIR/${relative(under.apps, under.scripts)}"`,
    ...sharedIn(given, under, COMPONENTS, WHY_COMPONENTS),
  ]
}

function stating(given: string | Reading): readonly string[] {
  return [
    'WIDGET_COMPONENTS="${NATIVE_SHELL_COMPONENTS:?is unset. The ios-app page names the components its widget extension compiles, and whatever runs this build exports them. This script states no list of its own to fall back to.}"',
    'WIDGET_NAME="${NATIVE_SHELL_WIDGET_NAME:?is unset. The widget program page states target-name, and whatever runs this build reads it off that page and exports it. This script states no name of its own to fall back to.}"',
    'WIDGET_DEST="ios/App/${WIDGET_NAME}"',
    'WIDGET_BUNDLE_ID="${NATIVE_SHELL_WIDGET_BUNDLE_ID:?is unset. The ios-app page states widget-bundle-id, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'WIDGET_TEAM="${NATIVE_SHELL_DEVELOPMENT_TEAM:?is unset. The ios-app page states development-team, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'WIDGET_DEPLOYMENT_TARGET="17.0"',
    'WIDGET_PROFILE_NAME="${NATIVE_SHELL_WIDGET_PROFILE_NAME:?is unset. The ios-app page states widget-profile-name, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'APP_PROFILE_NAME="${NATIVE_SHELL_APP_PROFILE_NAME:?is unset. The ios-app page states app-profile-name, and whatever runs this build exports it. This script states no value of its own to fall back to.}"',
    'PROJECT_PBXPROJ="ios/App/App.xcodeproj"',
    "",
    'WIDGET_ENABLED="${NATIVE_SHELL_WIDGET:-1}"',
    "",
    'WIDGET_REFRESH_ENABLED="${NATIVE_SHELL_WIDGET_REFRESH:-1}"',
    "",
    'MONARCH_TAP_ENABLED="${NATIVE_SHELL_MONARCH_TAP:-1}"',
    "",
    'APS_ENABLED="${NATIVE_SHELL_APS:-1}"',
    "",
    `ENTITLEMENTS_SRC="$PROGRAMS_DIR/$APP_PROGRAM/$APP_PROGRAM${tailOf(given, `${APP}${MAIN}`, ENTITLEMENTS)}"`,
    "",
  ]
}

function guarding(given: string | Reading, under: Under): readonly string[] {
  return [
    'if [[ ! -x "$PB" ]]; then',
    '  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2',
    "  exit 1",
    "fi",
    'if [[ ! -f "$PLIST" ]]; then',
    "  echo \"ERROR: $PLIST not found — run 'npx cap add ios' first.\" >&2",
    "  exit 1",
    "fi",
    ...sharedIn(given, under, STAMP, WHY_STAMP),
    ...sharedIn(given, under, MONARCH, WHY_MONARCH),
    "",
  ]
}

function drawing(given: string | Reading, under: Under): readonly string[] {
  return [
    '"$PB" -c "Delete :ITSAppUsesNonExemptEncryption" "$PLIST" 2>/dev/null || true',
    '"$PB" -c "Add :ITSAppUsesNonExemptEncryption bool false" "$PLIST"',
    'echo "OK: ITSAppUsesNonExemptEncryption=false applied to $PLIST"',
    "",
    'if [[ "$WIDGET_ENABLED" != "1" ]]; then',
    '  echo "OK: widget seam (§2) SKIPPED — NATIVE_SHELL_WIDGET=0."',
    "else",
    "",
    "if ! gem list -i xcodeproj >/dev/null 2>&1; then",
    '  echo "OK: installing the xcodeproj gem (user-install) for the widget seam…"',
    "  gem install --user-install xcodeproj",
    "fi",
    "",
    'mkdir -p "$WIDGET_DEST"',
    'rm -f "$WIDGET_DEST"/*.swift "$WIDGET_DEST/Info.plist"',
    'copy_widget_components "$SHARED_WIDGET_SRC_DIR" "$WIDGET_DEST" "$WIDGET_COMPONENTS"',
    'if [[ ! -f "$WIDGET_INFO_PLIST" ]]; then',
    '  echo "ERROR: $WIDGET_INFO_PLIST not found — the widget extension\'s Info.plist stands beside its akasha ios-program page, and Xcode has no target without it." >&2',
    "  exit 1",
    "fi",
    'cp "$WIDGET_INFO_PLIST" "$WIDGET_DEST/Info.plist"',
    'echo "OK: copied widget sources into $WIDGET_DEST"',
    "",
    'native_shell_stamp_widget "$WIDGET_DEST"',
    "",
    ...besideIn(given, under, TARGET),
    "",
    "fi",
    "",
    ...besideIn(given, under, PLUGINS),
    "",
    ...besideIn(given, under, CREDENTIAL),
    "",
    ...besideIn(given, under, ENTITLING),
    "",
    'native_shell_stamp_app "$APPDELEGATE"',
  ]
}

export function bodyIn(given: string | Reading): string {
  const apps = dirname(valuedAt(given, TYPE, APP_TYPE).path)
  const under: Under = {
    here: dirname(valuedAt(given, SCRIPT, OWN).path),
    apps,
    system: dirname(apps),
    scripts: dirname(dirname(valuedAt(given, SCRIPT, COMPONENTS).path)),
  }
  const lines = [
    ...opening(under),
    ...naming(given, under),
    ...stating(given),
    ...guarding(given, under),
    ...drawing(given, under),
  ]
  return `${lines.join("\n")}\n`
}
