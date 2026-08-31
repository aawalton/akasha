#!/usr/bin/env bash
set -euo pipefail

CONFIG="capacitor.config.json"
BUNDLE_ID="${NATIVE_SHELL_BUNDLE_ID:?is unset. The ios-app page states bundle-id, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
DISPLAY_NAME="${NATIVE_SHELL_DISPLAY_NAME:?is unset. The ios-app page states display-name, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"

if [[ ! -f "$CONFIG" ]]; then
  echo "ERROR: $CONFIG not found — run this from the native shell package root, which is where Capacitor reads it." >&2
  exit 1
fi

node -e '
  const fs = require("fs");
  const path = process.argv[1];
  const bundleId = process.argv[2];
  const displayName = process.argv[3];
  const config = JSON.parse(fs.readFileSync(path, "utf8"));
  config.appId = bundleId;
  config.appName = displayName;
  fs.writeFileSync(path, JSON.stringify(config, null, 2) + "\n");
  console.log("OK: wrote appId=" + bundleId + ", appName=" + displayName + " into " + path);
' "$CONFIG" "$BUNDLE_ID" "$DISPLAY_NAME"
