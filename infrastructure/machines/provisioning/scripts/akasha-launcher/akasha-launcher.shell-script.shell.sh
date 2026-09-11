#!/usr/bin/env bash
#
# The `akasha` name on PATH, resolving into the repository holding the dispatcher.
#
# The dispatcher is at `commands/modules/cli/cli.module.code.ts`, so a change to what `akasha` says
# or refuses is live on the commit that makes it, with no build and no deploy in between.
# `setup-symlinks` puts this file on PATH under the name `akasha`. It names the dispatcher by
# path rather than importing it, so it runs before any akasha code is loaded.
#
# `AKASHA_CPU_PROFILE_DIR` naming a directory turns Bun's sampling profiler on for that run
# alone. The flag has to sit on the line that starts Bun, so the name is read here rather
# than by akasha code, and whoever makes the call sets it rather than the machine holding it.

set -euo pipefail

root="${AKASHA_ROOT:-$HOME/repos/akasha}"
dispatcher="$root/commands/modules/cli/cli.module.code.ts"
into="${AKASHA_CPU_PROFILE_DIR:-}"

if [[ ! -f $dispatcher ]]; then
  echo "akasha: no dispatcher at $dispatcher — set AKASHA_ROOT to an akasha checkout" >&2
  exit 70
fi

profiling=()
if [[ -n $into ]]; then
  if [[ -d $into ]]; then
    profiling=(--cpu-prof --cpu-prof-md --cpu-prof-dir "$into" --cpu-prof-name "akasha-$$.md")
  else
    echo "akasha: AKASHA_CPU_PROFILE_DIR names \`$into\`, which is no directory, so nothing is profiled" >&2
  fi
fi

exec bun ${profiling[@]+"${profiling[@]}"} "$dispatcher" "$@"
