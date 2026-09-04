#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# The mac leg is this same file, rsynced across and run by name. The name is
# taken from what is running rather than written out, because a page's file is
# named for its slug and writing it twice makes the rename silently wrong.
SELF="$(basename "${BASH_SOURCE[0]}")"
MAC_HOST="${RENDER_HARNESS_HOST:-macbook}"

usage() {
  sed -n '2,40p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
}

ON_MAC=0
STAGED_WIDGET_DIR=""
APP="alanwalton"
WIDGET=""
FAMILY=""
PAYLOAD=""
OUT=""
while [ $# -gt 0 ]; do
  case "$1" in
    --app) APP="${2:-}"; shift 2 ;;
    --widget) WIDGET="${2:-}"; shift 2 ;;
    --family) FAMILY="${2:-}"; shift 2 ;;
    --payload) PAYLOAD="${2:-}"; shift 2 ;;
    --out) OUT="${2:-}"; shift 2 ;;
    --on-mac) ON_MAC=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "ERROR: unknown flag $1" >&2; usage >&2; exit 2 ;;
  esac
done

HARNESS_SRC_DIR=""
MAIN_SWIFT=""
if [ "$ON_MAC" = "1" ]; then
  # The workstation leg staged exactly this app's components here and rsynced the
  # harness's own Swift in flat beside main.swift, so both are already picked up.
  WIDGET_DIR="$(cd "$HERE/../../ios-widget" && pwd)"
  MAIN_SWIFT="$HERE/main.swift"
else
  # This script stands in akasha now, so the checkout is found from it rather
  # than guessed at $HOME/repos/akasha, which was right on one machine.
  AKASHA_ROOT="${AKASHA_ROOT:-$(cd "$HERE/../../../.." && pwd)}"
  COMPONENTS_DIR="$(cd "$AKASHA_ROOT/code-system/ios-components/pages" 2>/dev/null && pwd)" || {
    echo "ERROR: no ios components at $AKASHA_ROOT/code-system/ios-components/pages — every tile's Swift is authored there, so nothing can be rendered without it. Set AKASHA_ROOT if that checkout is elsewhere." >&2
    exit 2
  }
  HARNESS_SRC_DIR="$(cd "$AKASHA_ROOT/code-system/ios-harnesses/pages" 2>/dev/null && pwd)" || {
    echo "ERROR: no ios harnesses at $AKASHA_ROOT/code-system/ios-harnesses/pages — the cases and the rendering are authored there." >&2
    exit 2
  }
  # Which components this app compiles is stated on its akasha ios-app page. The
  # directory holds every app's, and compiling all of them would put two
  # definitions of one symbol into a single build.
  NAMED="$(cd "$AKASHA_ROOT" && bun -e 'import {componentSwiftFor} from "@akasha/mobile-cli/ios-program-components"; process.stdout.write(componentSwiftFor(process.argv[1]).join("\n"))' "$APP")" || {
    echo "ERROR: could not read the components --app $APP names from its akasha ios-app page." >&2
    exit 2
  }
  # Where the run begins stands beside the render-harness page, because Swift
  # allows top level statements only in a file named exactly main.swift and the
  # naming grammar cannot build that name.
  MAIN_SWIFT="$AKASHA_ROOT/code-system/ios-harnesses/pages/render-harness/main.swift"
  [ -f "$MAIN_SWIFT" ] || {
    echo "ERROR: no main.swift at $MAIN_SWIFT — the harness has no entry point to compile." >&2
    exit 2
  }
  WIDGET_DIR="$(mktemp -d)"
  STAGED_WIDGET_DIR="$WIDGET_DIR"
  while IFS= read -r component; do
    [ -n "$component" ] || continue
    [ -f "$COMPONENTS_DIR/$component" ] || {
      echo "ERROR: $COMPONENTS_DIR/$component is named by --app $APP and is not there." >&2
      exit 2
    }
    cp "$COMPONENTS_DIR/$component" "$WIDGET_DIR/"
  done <<< "$NAMED"
  # The seam writes DeviceSecretPins.swift into the widget destination on every
  # build, from values the ios-app page carries, and never commits it. The harness
  # runs no seam, so a component reading those pins has nothing to compile against.
  # It draws from the payload it is handed and queries no keychain, so a stand-in
  # saying what it is stands in for the generated one.
  if grep -rlq DeviceSecretPins "$WIDGET_DIR" 2>/dev/null; then
    cat > "$WIDGET_DIR/DeviceSecretPins.swift" <<'SWIFT_PINS'
// Written by the render harness. Nothing reads these: the harness draws from the
// payload it is handed rather than from a keychain.
enum DeviceSecretPins {
    static let service = "render-harness-stand-in"
    static let accessGroup = "render-harness-stand-in"
}
SWIFT_PINS
  fi
fi
DEFINE_FLAGS=""
if [ "$APP" = "alanwalton" ]; then DEFINE_FLAGS="-D HARNESS_ALANWALTON"; fi

if [ "$(uname)" != "Darwin" ] && [ "$ON_MAC" = "0" ]; then
  [ -n "$OUT" ] || OUT="$HOME/tmp/widget-render"
  mkdir -p "$OUT"
  command -v rsync >/dev/null || { echo "ERROR: rsync is needed to reach $MAC_HOST." >&2; exit 1; }

  REMOTE="$(ssh "$MAC_HOST" 'mktemp -d')"
  [ -n "$REMOTE" ] || { echo "ERROR: could not make a scratch directory on $MAC_HOST." >&2; exit 1; }
  # shellcheck disable=SC2064
  trap "rm -rf '$STAGED_WIDGET_DIR'; ssh '$MAC_HOST' 'rm -rf \"$REMOTE\"' >/dev/null 2>&1 || true" EXIT

  rsync -a "$WIDGET_DIR/" "$MAC_HOST:$REMOTE/ios-widget/"
  rsync -a "$HERE/" "$MAC_HOST:$REMOTE/scripts/render-harness/"
  rsync -a "$HARNESS_SRC_DIR"/*/*.swift "$MAC_HOST:$REMOTE/scripts/render-harness/"
  rsync -a "$MAIN_SWIFT" "$MAC_HOST:$REMOTE/scripts/render-harness/main.swift"

  REMOTE_ARGS=(--on-mac --app "$APP" --out "$REMOTE/out")
  if [ -n "$WIDGET" ]; then REMOTE_ARGS+=(--widget "$WIDGET"); fi
  if [ -n "$FAMILY" ]; then REMOTE_ARGS+=(--family "$FAMILY"); fi
  if [ -n "$PAYLOAD" ]; then
    [ -f "$PAYLOAD" ] || { echo "ERROR: no payload file at $PAYLOAD" >&2; exit 1; }
    rsync -a "$PAYLOAD" "$MAC_HOST:$REMOTE/payload.json"
    REMOTE_ARGS+=(--payload "$REMOTE/payload.json")
  fi

  STATUS=0
  # shellcheck disable=SC2029  # client-side expansion is the point here, and the
  ssh "$MAC_HOST" "bash '$REMOTE/scripts/render-harness/$SELF' $(printf '%q ' "${REMOTE_ARGS[@]}")" || STATUS=$?

  rsync -a "$MAC_HOST:$REMOTE/out/" "$OUT/" 2>/dev/null || true
  echo "IMAGES: $OUT"
  exit "$STATUS"
fi

[ "$(uname)" = "Darwin" ] || { echo "ERROR: this leg is macOS-only (it needs xcrun + simctl)." >&2; exit 1; }
[ -n "$OUT" ] || OUT="$HERE/out"
mkdir -p "$OUT"

DEVICE="$(xcrun simctl list devices booted | sed -n 's/.*(\([0-9A-Fa-f-]\{36\}\)) (Booted).*/\1/p' | head -1)"
if [ -z "$DEVICE" ]; then
  echo "ERROR: no booted simulator. Boot one (\`xcrun simctl boot <udid>\`) and retry." >&2
  exit 1
fi

BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR" "${STAGED_WIDGET_DIR:-}"' EXIT

SOURCES=()
collect_sources() {
  while IFS= read -r swift; do
    if grep -q '^@main$' "$swift"; then continue; fi
    case "$swift" in */main.swift) continue ;; esac
    SOURCES+=("$swift")
  done < <(find "$1" -maxdepth 2 -name '*.swift' | sort)
}
collect_sources "$WIDGET_DIR"
# On the mac leg the harness's own Swift was rsynced flat beside main.swift and is
# picked up by the sweep of $HERE below. Running on a Darwin workstation it is
# still in akasha, one folder per page.
if [ -n "$HARNESS_SRC_DIR" ]; then collect_sources "$HARNESS_SRC_DIR"; fi

while IFS= read -r swift; do
  case "$swift" in */main.swift) continue ;; esac
  SOURCES+=("$swift")
done < <(find "$HERE" -maxdepth 1 -name '*.swift' | sort)

# shellcheck disable=SC2086  # DEFINE_FLAGS is meant to word-split; see where it is set.
xcrun -sdk iphonesimulator swiftc \
  -target arm64-apple-ios17.0-simulator \
  $DEFINE_FLAGS \
  "${SOURCES[@]}" "$MAIN_SWIFT" \
  -o "$BUILD_DIR/render-harness"

ARGS=(--widget-sources "$WIDGET_DIR" --out "$OUT")
if [ -n "$WIDGET" ]; then ARGS+=(--widget "$WIDGET"); fi
if [ -n "$FAMILY" ]; then ARGS+=(--family "$FAMILY"); fi
if [ -n "$PAYLOAD" ]; then ARGS+=(--payload "$PAYLOAD"); fi

STATUS=0
xcrun simctl spawn "$DEVICE" "$BUILD_DIR/render-harness" "${ARGS[@]}" || STATUS=$?

exit "$STATUS"
