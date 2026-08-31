#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MAC_HOST="${RENDER_HARNESS_HOST:-macbook}"

usage() {
  sed -n '2,40p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
}

ON_MAC=0
APP="alanwalton"
WIDGET=""
FAMILY=""
PAYLOAD=""
OUT=""
BLESS=0
while [ $# -gt 0 ]; do
  case "$1" in
    --app) APP="${2:-}"; shift 2 ;;
    --widget) WIDGET="${2:-}"; shift 2 ;;
    --family) FAMILY="${2:-}"; shift 2 ;;
    --payload) PAYLOAD="${2:-}"; shift 2 ;;
    --out) OUT="${2:-}"; shift 2 ;;
    --bless) BLESS=1; shift ;;
    --on-mac) ON_MAC=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "ERROR: unknown flag $1" >&2; usage >&2; exit 2 ;;
  esac
done

REFERENCES="$HERE/references/$APP"

if [ "$ON_MAC" = "1" ]; then
  WIDGET_DIR="$(cd "$HERE/../../ios-widget" && pwd)"
  SHARED_WIDGET_DIR=""
else
  if [ "$BLESS" = "0" ] && [ ! -d "$REFERENCES" ]; then
    echo "ERROR: no blessed references at $REFERENCES." >&2
    exit 2
  fi
  AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
  WIDGET_DIR="$(cd "$AKASHA_ROOT/native-shell/$APP/ios-widget" 2>/dev/null && pwd)" || {
    echo "ERROR: no ios-widget sources for --app $APP under $AKASHA_ROOT/native-shell/$APP/. Set AKASHA_ROOT if that checkout is elsewhere." >&2
    exit 2
  }
  SHARED_WIDGET_DIR="$(cd "$AKASHA_ROOT/akasha/code-system/ios-component/ios-components" 2>/dev/null && pwd)" || {
    echo "ERROR: no shared ring components at $AKASHA_ROOT/akasha/code-system/ios-component/ios-components — both shells compile the ring from there, so neither can be rendered without it." >&2
    exit 2
  }
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
  trap "ssh '$MAC_HOST' 'rm -rf \"$REMOTE\"' >/dev/null 2>&1 || true" EXIT

  rsync -a "$WIDGET_DIR/" "$MAC_HOST:$REMOTE/ios-widget/"
  rsync -a "$SHARED_WIDGET_DIR/" "$MAC_HOST:$REMOTE/ios-widget/"
  rsync -a --exclude references "$HERE/" "$MAC_HOST:$REMOTE/scripts/render-harness/"
  mkdir -p "$REFERENCES"
  rsync -a "$REFERENCES/" "$MAC_HOST:$REMOTE/scripts/render-harness/references/$APP/"

  REMOTE_ARGS=(--on-mac --app "$APP" --out "$REMOTE/out")
  if [ -n "$WIDGET" ]; then REMOTE_ARGS+=(--widget "$WIDGET"); fi
  if [ -n "$FAMILY" ]; then REMOTE_ARGS+=(--family "$FAMILY"); fi
  if [ "$BLESS" = "1" ]; then REMOTE_ARGS+=(--bless); fi
  if [ -n "$PAYLOAD" ]; then
    [ -f "$PAYLOAD" ] || { echo "ERROR: no payload file at $PAYLOAD" >&2; exit 1; }
    rsync -a "$PAYLOAD" "$MAC_HOST:$REMOTE/payload.json"
    REMOTE_ARGS+=(--payload "$REMOTE/payload.json")
  fi

  STATUS=0
  # shellcheck disable=SC2029  # client-side expansion is the point here, and the
  ssh "$MAC_HOST" "bash '$REMOTE/scripts/render-harness/run.sh' $(printf '%q ' "${REMOTE_ARGS[@]}")" || STATUS=$?

  rsync -a "$MAC_HOST:$REMOTE/out/" "$OUT/" 2>/dev/null || true
  if [ "$BLESS" = "1" ]; then
    rsync -a "$MAC_HOST:$REMOTE/scripts/render-harness/references/$APP/" "$REFERENCES/"
  fi
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
trap 'rm -rf "$BUILD_DIR"' EXIT

SOURCES=()
collect_sources() {
  while IFS= read -r swift; do
    if grep -q '^@main$' "$swift"; then continue; fi
    SOURCES+=("$swift")
  done < <(find "$1" -maxdepth 2 -name '*.swift' | sort)
}
collect_sources "$WIDGET_DIR"
if [ -n "$SHARED_WIDGET_DIR" ]; then collect_sources "$SHARED_WIDGET_DIR"; fi

while IFS= read -r swift; do
  case "$swift" in */main.swift) continue ;; esac
  SOURCES+=("$swift")
done < <(find "$HERE" -maxdepth 1 -name '*.swift' | sort)

# shellcheck disable=SC2086  # DEFINE_FLAGS is meant to word-split; see where it is set.
xcrun -sdk iphonesimulator swiftc \
  -target arm64-apple-ios17.0-simulator \
  $DEFINE_FLAGS \
  "${SOURCES[@]}" "$HERE/main.swift" \
  -o "$BUILD_DIR/render-harness"

ARGS=(--widget-sources "$WIDGET_DIR" --out "$OUT" --references "$REFERENCES")
if [ -n "$WIDGET" ]; then ARGS+=(--widget "$WIDGET"); fi
if [ -n "$FAMILY" ]; then ARGS+=(--family "$FAMILY"); fi
if [ -n "$PAYLOAD" ]; then ARGS+=(--payload "$PAYLOAD"); fi
if [ "$BLESS" = "1" ]; then ARGS+=(--bless); fi

STATUS=0
xcrun simctl spawn "$DEVICE" "$BUILD_DIR/render-harness" "${ARGS[@]}" || STATUS=$?

if [ "$BLESS" = "1" ]; then
  mkdir -p "$REFERENCES"
  cat > "$REFERENCES/manifest.json" <<JSON
{
  "blessedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "xcode": "$(xcodebuild -version | tr '\n' ' ' | sed 's/ *$//')",
  "runtime": "$(xcrun simctl list devices booted | sed -n 's/^-- \(.*\) --$/\1/p' | head -1)",
  "device": "$(xcrun simctl list devices booted | sed -n 's/^ *\(.*\) (.*) (Booted).*$/\1/p' | head -1)"
}
JSON
fi

exit "$STATUS"
