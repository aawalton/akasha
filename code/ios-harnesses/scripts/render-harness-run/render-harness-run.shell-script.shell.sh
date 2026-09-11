#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# The mac leg is this same file, rsynced across and run by name. The name is
# taken from what is running rather than written out, because a page's file is
# named for its slug and writing it twice makes the rename silently wrong.
SELF="$(basename "${BASH_SOURCE[0]}")"
MAC_HOST="${RENDER_HARNESS_HOST:-macbook}"

usage() {
  cat <<'USAGE'
render-harness-run draws an app's tiles on a booted simulator.

  --app <slug>      whose tiles to draw, default alanwalton
  --widget <name>   draw this widget alone
  --family <name>   draw this family alone
  --payload <file>  hand the harness this payload
  --out <dir>       write the images here
  --on-mac          this is the mac leg, compiling what was staged beside it
  -h, --help        this
USAGE
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

HARNESS_SWIFT=()
MAIN_SWIFT=""
if [ "$ON_MAC" = "1" ]; then
  # The workstation leg staged exactly this app's components here and rsynced the
  # harness's own Swift in flat beside main.swift, so both are already picked up.
  WIDGET_DIR="$(cd "$HERE/../../ios-widget" && pwd)"
  MAIN_SWIFT="$HERE/main.swift"
else
  # This script sits in akasha, so the checkout is found from the script rather
  # than guessed at $HOME/repos/akasha, which was right on one machine.
  AKASHA_ROOT="${AKASHA_ROOT:-$(cd "$HERE/../../../.." && pwd)}"
  # Which components an app's tiles compile is stated on that app's widget page in
  # akasha, and this list is written from those pages rather than read on each run.
  case "$APP" in
    alanwalton)
      COMPONENT_SWIFT=(
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-attribute-stoplights-widget/alanwalton-attribute-stoplights-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-categorize-widget/alanwalton-categorize-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-claude-usage-payload/alanwalton-claude-usage-payload.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-claude-usage-view/alanwalton-claude-usage-view.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-claude-usage-widget/alanwalton-claude-usage-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-cost-widget/alanwalton-cost-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-device-secret-reader/alanwalton-device-secret-reader.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-inbox-stoplights-widget/alanwalton-inbox-stoplights-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-never-loaded-view/alanwalton-never-loaded-view.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-refused-view/alanwalton-refused-view.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-safety-level-widget/alanwalton-safety-level-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-stoplight-ring/alanwalton-stoplight-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-surplus-widget/alanwalton-surplus-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-upkeep-stoplights-widget/alanwalton-upkeep-stoplights-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-widget-feed/alanwalton-widget-feed.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/categorize-ring/categorize-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/cost-ring/cost-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/ring/ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/safety-ring/safety-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/spacing/spacing.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/surplus-ring/surplus-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/tier/tier.ios-component.swift.swift"
      )
      ;;
    smilingjenny)
      COMPONENT_SWIFT=(
        "$AKASHA_ROOT/code/ios-components/pages/alanwalton-stoplight-ring/alanwalton-stoplight-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/categorize-ring/categorize-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/cost-ring/cost-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/ring/ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/safety-ring/safety-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-categorize-view/smilingjenny-categorize-view.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-categorize-widget/smilingjenny-categorize-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-cost-widget/smilingjenny-cost-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-safety-level-widget/smilingjenny-safety-level-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-surplus-widget/smilingjenny-surplus-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-upkeep-stoplights-widget/smilingjenny-upkeep-stoplights-widget.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/smilingjenny-widget-feed/smilingjenny-widget-feed.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/spacing/spacing.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/surplus-ring/surplus-ring.ios-component.swift.swift"
        "$AKASHA_ROOT/code/ios-components/pages/tier/tier.ios-component.swift.swift"
      )
      ;;
    *)
      echo "ERROR: --app $APP names no akasha ios-app whose tiles this draws. Those are alanwalton, smilingjenny." >&2
      exit 2
      ;;
  esac
  # The harness's own Swift is one file per akasha ios-harness page, and this list
  # is written from those pages rather than swept out of the folder they sit in.
  HARNESS_SWIFT=(
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-cases-categorize/render-harness-cases-categorize.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-cases-cost/render-harness-cases-cost.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-cases-safety/render-harness-cases-safety.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-cases-surplus/render-harness-cases-surplus.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-cases-wide/render-harness-cases-wide.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-cases/render-harness-cases.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-families/render-harness-families.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-rendering/render-harness-rendering.ios-harness.swift.swift"
    "$AKASHA_ROOT/code/ios-harnesses/pages/render-harness-views/render-harness-views.ios-harness.swift.swift"
  )
  # Where the run begins sits beside the render-harness page, because Swift
  # allows top level statements only in a file named exactly main.swift and the
  # naming grammar cannot build that name.
  MAIN_SWIFT="$AKASHA_ROOT/code/ios-harnesses/pages/render-harness/main.swift"
  [ -f "$MAIN_SWIFT" ] || {
    echo "ERROR: no main.swift at $MAIN_SWIFT — the harness has no entry point to compile." >&2
    exit 2
  }
  WIDGET_DIR="$(mktemp -d)"
  STAGED_WIDGET_DIR="$WIDGET_DIR"
  for component in "${COMPONENT_SWIFT[@]}"; do
    [ -f "$component" ] || {
      echo "ERROR: $component is named by --app $APP and is not there." >&2
      exit 2
    }
    cp "$component" "$WIDGET_DIR/"
  done
  # The seam writes DeviceSecretPins.swift into the widget destination on every
  # build, from values the ios-app page carries, and never commits it. The harness
  # runs no seam, so a component reading those pins has nothing to compile against.
  # It draws from the payload it is handed and queries no keychain, so a placeholder
  # saying what it is replaces the generated one.
  if grep -rlq DeviceSecretPins "$WIDGET_DIR" 2>/dev/null; then
    cat > "$WIDGET_DIR/DeviceSecretPins.swift" <<'SWIFT_PINS'
// Written by the render harness. Nothing reads these: the harness draws from the
// payload it is handed rather than from a keychain.
enum DeviceSecretPins {
    static let service = "render-harness-placeholder"
    static let accessGroup = "render-harness-placeholder"
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
  rsync -a "${HARNESS_SWIFT[@]}" "$MAC_HOST:$REMOTE/scripts/render-harness/"
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
  # shellcheck disable=SC2029  # the arguments are expanded here on purpose, and printf %q quotes each.
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
# still in akasha, one file to a page.
if [ "$ON_MAC" = "0" ]; then SOURCES+=("${HARNESS_SWIFT[@]}"); fi

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
