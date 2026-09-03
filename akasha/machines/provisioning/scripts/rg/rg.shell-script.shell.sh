#!/usr/bin/env bash
# ripgrep. A socket on fd 0 is what a bun-spawned shell inherits, never a search subject.
ripgrep="$HOME/repos/akasha/node_modules/@vscode/ripgrep-linux-x64/bin/rg"
if [ ! -x "$ripgrep" ]; then
  ripgrep="${CLAUDE_CODE_EXECPATH:-}"
  [ -x "$ripgrep" ] || ripgrep="$HOME/.local/bin/claude"
fi
if [ -S /dev/stdin ]; then
  exec -a rg "$ripgrep" "$@" </dev/null
fi
exec -a rg "$ripgrep" "$@"
