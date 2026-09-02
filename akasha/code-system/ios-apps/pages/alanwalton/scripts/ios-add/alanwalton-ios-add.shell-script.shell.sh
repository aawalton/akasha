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
SHARED="$(cd "$PACKAGE/../../shell-scripts" && pwd)"
cd "$PACKAGE"

# cap is a devDependency binary, and bun hoists it to the workspace root rather
# than leaving it beside the package that depends on it — so it is looked for the
# way node resolves one, from this package upward.
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

# This shell's www/ is a built SPA bundle rather than a committed page, staged by
# alanwalton-stage-app or rsynced in by the run that cuts a build. Capacitor copies
# whatever stands there, so an absent one is caught here rather than shipped empty.
if [[ ! -f www/index.html ]]; then
  echo "ERROR: no www/index.html — this shell serves a built SPA bundle, and Capacitor would copy an empty directory into the app. Run alanwalton-stage-app first." >&2
  exit 1
fi

bash "$SHARED/write-capacitor-config/write-capacitor-config.shell-script.shell.sh" \
  "$PACKAGE/alanwalton.ios-app.capacitor-config.json"
"$CAP" "$MODE" ios
bash "$HERE/../alanwalton-ios-seam/alanwalton-ios-seam.shell-script.shell.sh"
