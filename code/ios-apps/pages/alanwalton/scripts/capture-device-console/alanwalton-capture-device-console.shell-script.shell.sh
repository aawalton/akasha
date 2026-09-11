#!/usr/bin/env bash
set -euo pipefail

BUNDLE_ID="${1:-com.alanwalton.app}"
TS="$(date -u +%Y%m%dT%H%M%SZ)"
OUTPUT_PATH="${2:-./device-console-$TS.log}"

if ! command -v xcrun >/dev/null 2>&1; then
  echo "ERROR: xcrun not found — this script is macOS-only (requires Xcode)." >&2
  exit 1
fi

DEVICE_ID="${DEVICE_ID:-}"
if [[ -z "$DEVICE_ID" ]]; then
  if ! command -v python3 >/dev/null 2>&1; then
    echo "ERROR: python3 not found — needed to parse devicectl JSON. Export DEVICE_ID to skip auto-detection." >&2
    exit 1
  fi
  DEVJSON="$(mktemp -t devicectl-list.XXXXXX)"
  trap 'rm -f "$DEVJSON"' EXIT
  xcrun devicectl list devices --json-output "$DEVJSON" >/dev/null 2>&1
  DEVICE_ID="$(python3 - "$DEVJSON" <<'PY'
import json, sys
with open(sys.argv[1]) as fh:
    data = json.load(fh)
devices = (data.get("result") or {}).get("devices") or []
def is_ios(d): return (d.get("hardwareProperties") or {}).get("platform") == "iOS"
def connected(d): return (d.get("connectionProperties") or {}).get("tunnelState") == "connected"
pick = next((d for d in devices if is_ios(d) and connected(d)), None) \
    or next((d for d in devices if is_ios(d)), None)
if not pick or not pick.get("identifier"):
    sys.stderr.write("no connected iOS device found\n")
    sys.exit(2)
sys.stdout.write(pick["identifier"])
PY
)"
fi

if [[ -z "$DEVICE_ID" ]]; then
  echo "ERROR: could not auto-detect a connected iOS device. Plug in + trust the iPhone, or export DEVICE_ID." >&2
  exit 1
fi

echo "Device:  $DEVICE_ID"
echo "Bundle:  $BUNDLE_ID"
echo "Log:     $OUTPUT_PATH"
echo "Launching with --console (not lldb; does not block app suspension). Ctrl-C to stop."
echo

xcrun devicectl device process launch \
  --console \
  --terminate-existing \
  --device "$DEVICE_ID" \
  "$BUNDLE_ID" 2>&1 | tee "$OUTPUT_PATH"
