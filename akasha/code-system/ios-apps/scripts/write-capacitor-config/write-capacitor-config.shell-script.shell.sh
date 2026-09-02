#!/usr/bin/env bash
set -euo pipefail

# Named rather than found: the file this writes is what Capacitor reads, and the
# file it writes FROM stands beside an app's page under the naming grammar. They
# were one file until now — the authored one was overwritten in place with the
# two values below, which left a tracked source file carrying build output and a
# working tree that read as edited on every machine without a hook to put it back.
AUTHORED="${1:-}"
[ -n "$AUTHORED" ] || {
  echo "ERROR: name the config to write from. It stands beside the app's page as" >&2
  echo "       <slug>.ios-app.capacitor-config.json. A shell that has not moved into" >&2
  echo "       akasha names its own capacitor.config.json and is written in place." >&2
  exit 2
}
[ -f "$AUTHORED" ] || {
  echo "ERROR: $AUTHORED is not there, so there is nothing to write a config from." >&2
  exit 1
}

BUNDLE_ID="${NATIVE_SHELL_BUNDLE_ID:?is unset. The ios-app page states bundle-id, and the command running this build exports it. This script states no value of its own to fall back to.}"
DISPLAY_NAME="${NATIVE_SHELL_DISPLAY_NAME:?is unset. The ios-app page states display-name, and the command running this build exports it. This script states no value of its own to fall back to.}"

DEST="$(cd "$(dirname "$AUTHORED")" && pwd)/capacitor.config.json"

node -e '
  const fs = require("fs");
  const [authored, dest, bundleId, displayName] = process.argv.slice(1);
  const config = JSON.parse(fs.readFileSync(authored, "utf8"));
  config.appId = bundleId;
  config.appName = displayName;
  fs.writeFileSync(dest, JSON.stringify(config, null, 2) + "\n");
  console.log("OK: wrote appId=" + bundleId + ", appName=" + displayName + " into " + dest);
' "$AUTHORED" "$DEST" "$BUNDLE_ID" "$DISPLAY_NAME"
