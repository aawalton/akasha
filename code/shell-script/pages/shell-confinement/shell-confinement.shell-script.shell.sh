#!/usr/bin/env bash
#
# RUNS EVERY SHELL COMMAND AN AGENT'S HARNESS STARTS. The agent settings name a file running this
# in `CLAUDE_CODE_SHELL_PREFIX`, so Claude Code hands each command here as one argument. An agent's
# Bash call runs with this checkout read-only, and with every place read-only that a call running
# outside takes code or settings from. The network is left as it is.
#
# AN AGENT'S CALL IS KNOWN BY THE LINE THE HARNESS WRAPS IT IN, which ends by writing the working
# folder out: `... && pwd -P >| <file>`. A hook, the statusline and a server the harness starts
# carry no such line, and run as they were handed.
#
# AN AKASHA CALL ALONE ON THE LINE RUNS OUTSIDE, so akasha writes the checkout, and
# `shell-confining` says what is alone. A judge giving no answer lets the call out, so it never
# locks an agent out of akasha.
#
# A GAME MASTER'S CALL IS HIDDEN MORE, as `withheld-hiding` prints for the seat `AGENT_ID` names:
# each withheld page reads as the refusal, and the git store, the Claude folders, the session's
# sockets and the network are gone. A machine with no bwrap confines nothing, so there a game
# master's call is refused, and so is every call where no one can say whose seat it is.

handed=$1
root=${AKASHA_ROOT:-$HOME/repos/akasha}
here=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
judge=$here/../../../../agent/modules/shell-confining/shell-confining.module.code.ts
hider=$here/../../../../agent/modules/withheld-hiding/withheld-hiding.module.code.ts
bun=$(command -v bun || echo "$HOME/.bun/bin/bun")

if [[ $handed != *'&& pwd -P >| '* ]]; then
  exec bash -c "$handed"
fi

if [[ $handed == *"&& eval 'akasha"* || $handed == *"&& eval 'export "*$'\n'akasha* ]]; then
  verdict=$("$bun" "$judge" "$handed" 2>/dev/null) || verdict=out
  if [[ $verdict == out ]]; then
    exec bash -c "$handed"
  fi
  echo "shell-confinement: the checkout is read-only in this call; an akasha call writes it only alone on the line" >&2
fi

if ! hiding=$("$bun" "$hider" "$root"); then
  echo "shell-confinement: whether this seat is a game master's could not be judged, so nothing ran" >&2
  exit 1
fi

if ! command -v bwrap >/dev/null; then
  if [[ -n $hiding ]]; then
    echo "shell-confinement: a game master's call runs only confined, and this machine has no bwrap" >&2
    exit 1
  fi
  exec bash -c "$handed"
fi

hidden=()
if [[ -n $hiding ]]; then
  mapfile -t hidden <<<"$hiding"
fi

kept=()
for at in "$root" "$HOME/.local/bin" "$HOME/.local/state/akasha" "$HOME/.bun/bin" \
  "$HOME/.claude" "$HOME/.secrets.env" /var/tmp/agent-settings-*.json; do
  if [[ -e $at ]]; then
    kept+=(--ro-bind "$at" "$at")
  fi
done
exec bwrap --dev-bind / / "${kept[@]}" "${hidden[@]}" -- bash -c "$handed"
