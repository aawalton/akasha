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

# cap is installed at the root of the tree this shell sits in rather than beside
# the shell, so it is looked for the way node resolves one, from here upward.
CAP=""
CANDIDATE="$SHELL_DIR"
while [[ "$CANDIDATE" != "/" ]]; do
  if [[ -x "$CANDIDATE/node_modules/.bin/cap" ]]; then
    CAP="$CANDIDATE/node_modules/.bin/cap"
    break
  fi
  CANDIDATE="$(dirname "$CANDIDATE")"
done
if [[ -z "$CAP" ]]; then
  echo "ERROR: no Capacitor CLI in any node_modules/.bin from $SHELL_DIR upward. The install root above this shell names it, and the install did not run." >&2
  exit 1
fi

bash "$SHARED/write-capacitor-config/write-capacitor-config.shell-script.shell.sh" \
  "$SHELL_DIR/atlas.ios-app.capacitor-config.json"
"$CAP" "$MODE" ios
bash "$HERE/../ios-seam/atlas-ios-seam.shell-script.shell.sh"
