import { AKASHA } from "../terminal-entry-points/terminal-entry-points.module.code.ts"

export const RELOAD_FN = "_akasha_reload"

export const COMPOSING = "shell-init-bash"

export function implName(name: string): string {
  return `_akasha_fn_${name}`
}

export function launcher(name: string, impl: string): string {
  return [`${name}() {`, `  ${RELOAD_FN}`, `  ${implName(name)} "$@"`, "}", "", impl].join("\n")
}

export function reloadFnLines(): readonly string[] {
  return [
    `${RELOAD_FN}() {`,
    `  local _akasha_cli=${AKASHA} _akasha_text _akasha_why=""`,
    '  if [ ! -x "$_akasha_cli" ]; then',
    '    _akasha_why="nothing to run at $_akasha_cli"',
    `  elif ! _akasha_text=$("$_akasha_cli" ${COMPOSING}); then`,
    '    _akasha_why="the command exited nonzero"',
    '  elif [ -z "$_akasha_text" ]; then',
    '    _akasha_why="the command composed nothing"',
    '  elif ! bash -n <<<"$_akasha_text"; then',
    '    _akasha_why="the composed set does not parse"',
    '  elif ! eval "$_akasha_text"; then',
    '    _akasha_why="the composed set would not load"',
    "  else",
    "    return 0",
    "  fi",
    '  echo "akasha: $_akasha_why — the shell functions were not reloaded, so this one is running ' +
      "the definition your terminal started with, which may be stale. Run 's.' once the " +
      'checkout is sound." >&2',
    "  return 1",
    "}",
  ]
}
