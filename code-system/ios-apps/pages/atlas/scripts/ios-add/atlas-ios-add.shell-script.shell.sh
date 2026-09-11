#!/usr/bin/env bash
set -euo pipefail

# The one way into this shell. `add` makes the native sources from nothing,
# `sync` refreshes ones already there, and everything either side of that call
# is the same for both.
MODE="${1:-}"
case "$MODE" in
  add | sync) ;;
  *)
    echo "ERROR: pass 'add' to make the native sources or 'sync' to refresh them — got '${MODE:-nothing}'." >&2
    exit 2
    ;;
esac

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SHELL_DIR="$(cd "$HERE/../.." && pwd)"
SHARED="$(cd "$SHELL_DIR/../../scripts" && pwd)"
cd "$SHELL_DIR"

# The one manifest is at the root of the tree this shell sits in, the install runs
# there, and the Capacitor CLI lands there rather than beside this shell.
TREE_ROOT="${NATIVE_SHELL_TREE_ROOT:?is unset. The one manifest is at the root of the tree this shell sits in, and the command running this build names where that root is.}"
CAP="$TREE_ROOT/node_modules/.bin/cap"
[ -x "$CAP" ] || {
  echo "ERROR: no Capacitor CLI at $CAP. The manifest at that root names it, and the install did not run." >&2
  exit 1
}

bash "$SHARED/write-capacitor-config/write-capacitor-config.shell-script.shell.sh" \
  "$SHELL_DIR/atlas.ios-app.capacitor-config.json"

# Capacitor reads its config out of the folder it runs in and refuses a folder
# holding no manifest, so it runs at the root above. The config written there names
# this shell's own web directory and native sources from that root.
cd "$TREE_ROOT"
"$CAP" "$MODE" ios
cd "$SHELL_DIR"
bash "$HERE/../ios-seam/atlas-ios-seam.shell-script.shell.sh"
