#!/usr/bin/env bash
set -euo pipefail

# The one way into this package. `add` generates the native project from nothing,
# `sync` refreshes one that already stands, and everything either side of that call
# is the same for both. The manifest carried both chains in full until this script
# stood, differing by a single word with nothing keeping the rest in step.
MODE="${1:-}"
case "$MODE" in
  add | sync) ;;
  *)
    echo "ERROR: pass 'add' to generate the native project or 'sync' to refresh one — got '${MODE:-nothing}'." >&2
    exit 2
    ;;
esac

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE="$(cd "$HERE/../.." && pwd)"
SHARED="$(cd "$PACKAGE/../../scripts" && pwd)"
cd "$PACKAGE"

# The one manifest is at the root of the tree this shell sits in, the install runs
# there, and the Capacitor CLI lands there rather than beside this shell.
TREE_ROOT="${NATIVE_SHELL_TREE_ROOT:?is unset. The one manifest is at the root of the tree this shell sits in, and the command running this build names where that root is.}"
CAP="$TREE_ROOT/node_modules/.bin/cap"
[ -x "$CAP" ] || {
  echo "ERROR: no Capacitor CLI at $CAP. The manifest at that root names it, and the install did not run." >&2
  exit 1
}

bash "$SHARED/write-capacitor-config/write-capacitor-config.shell-script.shell.sh" \
  "$PACKAGE/alanwalton.ios-app.capacitor-config.json"
# BEFORE the Capacitor call, which copies whatever sits in webDir into the native
# project. Staged after, this run would ship the page the run before it left there.
bash "$SHARED/stage-web-entry/stage-web-entry.shell-script.shell.sh" \
  "$PACKAGE/alanwalton.ios-app.web-entry.html"

# Capacitor reads its config out of the folder it runs in and refuses a folder
# holding no manifest, so it runs at the root above. The config written there names
# this shell's own web directory and native sources from that root.
cd "$TREE_ROOT"
"$CAP" "$MODE" ios
cd "$PACKAGE"
bash "$HERE/../ios-seam/alanwalton-ios-seam.shell-script.shell.sh"
