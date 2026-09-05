#!/usr/bin/env bash
#
# The `akasha` name on PATH, resolving into the repository holding the dispatcher.
#
# The dispatcher is at `command-system/cli/cli.module.code.ts`, so a change to what `akasha` says
# or refuses is live on the commit that makes it, with no build and no deploy in between.
# `setup-symlinks` puts this file on PATH under the name `akasha`. It names the dispatcher by
# path rather than importing it, so it runs before any akasha code is loaded.

set -euo pipefail

root="${AKASHA_ROOT:-$HOME/repos/akasha}"
dispatcher="$root/command-system/cli/cli.module.code.ts"

if [[ ! -f $dispatcher ]]; then
  echo "akasha: no dispatcher at $dispatcher — set AKASHA_ROOT to an akasha checkout" >&2
  exit 70
fi

exec bun "$dispatcher" "$@"
