import { basename } from "node:path"
import {
  folderOf,
  relativeBetween,
} from "akasha/code/path-between/code-path-between.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "atlas-ios-seam"

const STAMP = "build-stamp"

const SHELL = "shell"

type Reaching = {
  readonly up: string
  readonly shared: string
  readonly stamp: string
}

function stampIn(given: string | Reading): string {
  return fileOf(given, valuedAt(given, SCRIPT, STAMP), SCRIPT, SHELL)
}

function hereIn(given: string | Reading): string {
  return folderOf(valuedAt(given, SCRIPT, OWN).path)
}

export function sourcedIn(given: string | Reading): string {
  return relativeBetween(hereIn(given), stampIn(given))
}

function reachingIn(given: string | Reading): Reaching {
  const stamp = stampIn(given)
  const shared = folderOf(folderOf(stamp))
  const way = relativeBetween(hereIn(given), shared)
  return { up: folderOf(way), shared: basename(way), stamp: relativeBetween(shared, stamp) }
}

function opening(reaching: Reaching): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# Everything this seam READS is in akasha and is found from this script.",
    "# Everything it WRITES is under ios/, which belongs to the package it was run in",
    "# and is reached from the working directory.",
    'HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
    `IOS_APP_DIR="$(cd "$HERE/${reaching.up}" && pwd)"`,
    `SHARED_IOS_SEAM_DIR="$IOS_APP_DIR/${reaching.shared}"`,
    "",
    'PLIST="ios/App/App/Info.plist"',
    'APPDELEGATE="ios/App/App/AppDelegate.swift"',
    'PB="/usr/libexec/PlistBuddy"',
    "",
  ]
}

function sourcing(given: string | Reading, reaching: Reaching): readonly string[] {
  return [
    'if [[ ! -x "$PB" ]]; then',
    '  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2',
    "  exit 1",
    "fi",
    'if [[ ! -f "$PLIST" ]]; then',
    "  echo \"ERROR: $PLIST not found — run 'npx cap add ios' first.\" >&2",
    "  exit 1",
    "fi",
    `if [[ ! -f "$SHARED_IOS_SEAM_DIR/${reaching.stamp}" ]]; then`,
    `  echo "ERROR: $SHARED_IOS_SEAM_DIR/${reaching.stamp} not found — the App binary could not be stamped, and an unstamped binary is refused at the upload gate." >&2`,
    "  exit 1",
    "fi",
    `# shellcheck source=${sourcedIn(given)}`,
    `. "$SHARED_IOS_SEAM_DIR/${reaching.stamp}"`,
    "",
  ]
}

function writing(): readonly string[] {
  return [
    'LOCATION_ALWAYS_DESC="Atlas records your location in the background to map the streets and sidewalks you have walked, so you can see how much of an area you have covered."',
    'LOCATION_WHENINUSE_DESC="Atlas uses your location to record the paths you walk."',
    "",
    '"$PB" -c "Delete :UIBackgroundModes" "$PLIST" 2>/dev/null || true',
    '"$PB" -c "Add :UIBackgroundModes array" "$PLIST"',
    '"$PB" -c "Add :UIBackgroundModes:0 string location" "$PLIST"',
    'echo "OK: UIBackgroundModes=[location] applied to $PLIST"',
    "",
    '"$PB" -c "Delete :NSLocationAlwaysAndWhenInUseUsageDescription" "$PLIST" 2>/dev/null || true',
    '"$PB" -c "Add :NSLocationAlwaysAndWhenInUseUsageDescription string ${LOCATION_ALWAYS_DESC}" "$PLIST"',
    '"$PB" -c "Delete :NSLocationWhenInUseUsageDescription" "$PLIST" 2>/dev/null || true',
    '"$PB" -c "Add :NSLocationWhenInUseUsageDescription string ${LOCATION_WHENINUSE_DESC}" "$PLIST"',
    '"$PB" -c "Delete :NSLocationAlwaysUsageDescription" "$PLIST" 2>/dev/null || true',
    '"$PB" -c "Add :NSLocationAlwaysUsageDescription string ${LOCATION_ALWAYS_DESC}" "$PLIST"',
    'echo "OK: NSLocation* usage descriptions applied to $PLIST"',
    "",
    '"$PB" -c "Delete :ITSAppUsesNonExemptEncryption" "$PLIST" 2>/dev/null || true',
    '"$PB" -c "Add :ITSAppUsesNonExemptEncryption bool false" "$PLIST"',
    'echo "OK: ITSAppUsesNonExemptEncryption=false applied to $PLIST"',
    "",
    "# This app builds no widget extension, so the App binary is the only one to stamp.",
    'native_shell_stamp_app "$APPDELEGATE"',
  ]
}

export function bodyIn(given: string | Reading): string {
  const reaching = reachingIn(given)
  const lines = [...opening(reaching), ...sourcing(given, reaching), ...writing()]
  return `${lines.join("\n")}\n`
}
