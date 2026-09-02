#!/usr/bin/env bash
set -euo pipefail

# The one way into this package. `add` generates the native project from nothing,
# `sync` refreshes one that already stands, and everything either side of that call
# is the same for both. The manifest carried both chains in full until this script
# stood: four steps duplicated across two lines differing by a single word, with
# nothing keeping the other three in step.
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
SHARED="$(cd "$PACKAGE/../../shell-scripts" && pwd)"
cd "$PACKAGE"

# cap is a devDependency binary, and bun hoists it to the workspace root rather
# than leaving it beside the package that depends on it — so it is looked for the
# way node resolves one, from this package upward. Reached through `bun run` it is
# already on PATH and reached by running this file directly it is not, and a PATH
# that happens to hold it is not something to build on.
CAP=""
CANDIDATE="$PACKAGE"
while [[ "$CANDIDATE" != "/" ]]; do
  if [[ -x "$CANDIDATE/node_modules/.bin/cap" ]]; then
    CAP="$CANDIDATE/node_modules/.bin/cap"
    break
  fi
  CANDIDATE="$(dirname "$CANDIDATE")"
done
if [[ -z "$CAP" ]]; then
  echo "ERROR: no Capacitor CLI in any node_modules/.bin from $PACKAGE upward — it is a devDependency of this package and the workspace installs it. Run 'bun install' at the repo root." >&2
  exit 1
fi

bash "$SHARED/write-capacitor-config/write-capacitor-config.shell-script.shell.sh" \
  "$PACKAGE/smilingjenny.ios-app.capacitor-config.json"
# BEFORE the Capacitor call, which copies whatever stands in webDir into the native
# project. Staged after, this run would ship the page the run before it left there.
bash "$SHARED/stage-web-entry/stage-web-entry.shell-script.shell.sh" \
  "$PACKAGE/smilingjenny.ios-app.web-entry.html"
"$CAP" "$MODE" ios
bash "$HERE/../smilingjenny-ios-seam/smilingjenny-ios-seam.shell-script.shell.sh"
