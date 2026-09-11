import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const MODULE = "module"

const CODE = "code"

const DISPATCHER = "cli"

const UNDER = "$root/"

export function dispatcherIn(given: string | Reading): string {
  return fileOf(given, valuedAt(given, MODULE, DISPATCHER), MODULE, CODE)
}

export function bodyIn(given: string | Reading): string {
  const at = dispatcherIn(given)
  const lines = [
    "#!/usr/bin/env bash",
    "#",
    "# The `akasha` name on PATH, resolving into the repository holding the dispatcher.",
    "#",
    `# The dispatcher is at \`${at}\`, so a change to what \`akasha\` says`,
    "# or refuses is live on the commit that makes it, with no build and no deploy in between.",
    "# `setup-symlinks` puts this file on PATH under the name `akasha`. It names the dispatcher by",
    "# path rather than importing it, so it runs before any akasha code is loaded.",
    "#",
    "# A file at `$XDG_STATE_HOME/akasha/cpu-profile-dir` holding a directory turns Bun's sampling",
    "# profiler on. The flag has to sit on the line that starts Bun, and an agent writes nothing",
    "# before `akasha` on its own line, so the switch is a file rather than a variable.",
    "",
    "set -euo pipefail",
    "",
    'root="${AKASHA_ROOT:-$HOME/repos/akasha}"',
    `dispatcher="${UNDER}${at}"`,
    'switch="${XDG_STATE_HOME:-$HOME/.local/state}/akasha/cpu-profile-dir"',
    "",
    "if [[ ! -f $dispatcher ]]; then",
    '  echo "akasha: no dispatcher at $dispatcher — set AKASHA_ROOT to an akasha checkout" >&2',
    "  exit 70",
    "fi",
    "",
    "profiling=()",
    "if [[ -f $switch ]]; then",
    '  into="$(<"$switch")"',
    "  if [[ -d $into ]]; then",
    '    profiling=(--cpu-prof --cpu-prof-md --cpu-prof-dir "$into" --cpu-prof-name "akasha-$$.md")',
    "  else",
    '    echo "akasha: $switch names \\`$into\\`, which is no directory, so nothing is profiled" >&2',
    "  fi",
    "fi",
    "",
    'exec bun ${profiling[@]+"${profiling[@]}"} "$dispatcher" "$@"',
  ]
  return `${lines.join("\n")}\n`
}
