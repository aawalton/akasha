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
# `shell-confining` says what is alone. Only a judge that ends well printing `out` lets a call out;
# a judge that fails, prints nothing or prints anything else leaves the call confined.
#
# NO CALL INSIDE REACHES THE USER'S SESSION. The runtime folder is emptied but for the
# supervisors' logs, read-only, and the ssh agent's socket, and the system bus's folder is emptied,
# so no bus, no service manager and no other session's socket runs a command outside. Every tmux
# server's sockets are emptied too, under /tmp and under `TMUX_TMPDIR`.
#
# A GAME MASTER'S CALL IS HIDDEN MORE, as `withheld-hiding` prints for the seat `AGENT_ID` names:
# each withheld page reads as the refusal, and the git store, the Claude folders, the whole runtime
# folder and the network are gone. A call where no one can say whose seat it is is refused.
#
# A MACHINE WITH NO BWRAP CONFINES NOTHING, so there an akasha call alone on the line runs and every
# other agent's call is refused.

handed=$1
root=${AKASHA_ROOT:-$HOME/repos/akasha}
here=$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")
judge=$here/../../../../agent/modules/shell-confining/shell-confining.module.code.ts
hider=$here/../../../../agent/modules/withheld-hiding/withheld-hiding.module.code.ts
bun=$(command -v bun || echo "$HOME/.bun/bin/bun")
runtime=${XDG_RUNTIME_DIR:-/run/user/$UID}

if [[ $handed != *'&& pwd -P >| '* ]]; then
  exec bash -c "$handed"
fi

if [[ $handed == *"&& eval 'akasha"* || $handed == *"&& eval 'export "*$'\n'akasha* ]]; then
  verdict=$("$bun" "$judge" "$handed" 2>/dev/null) || verdict=
  if [[ $verdict == out ]]; then
    exec bash -c "$handed"
  fi
  echo "shell-confinement: the checkout is read-only in this call; an akasha call writes it only alone on the line" >&2
fi

if ! command -v bwrap >/dev/null; then
  echo "shell-confinement: this machine has no bwrap, so only an akasha call alone on the line runs" >&2
  exit 1
fi

if ! hiding=$("$bun" "$hider" "$root" "${handed##*'&& pwd -P >| '}"); then
  echo "shell-confinement: whether this seat is a game master's could not be judged, so nothing ran" >&2
  exit 1
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

session=(--unsetenv DBUS_SESSION_BUS_ADDRESS --unsetenv DBUS_SYSTEM_BUS_ADDRESS --unsetenv TMUX --unsetenv TMUX_PANE)
if [[ -d $runtime ]]; then
  session+=(--perms 0700 --tmpfs "$runtime")
  if [[ -d $runtime/akasha ]]; then
    session+=(--ro-bind "$runtime/akasha" "$runtime/akasha")
  fi
  if [[ $SSH_AUTH_SOCK == "$runtime"/* && -e $SSH_AUTH_SOCK ]]; then
    session+=(--bind "$SSH_AUTH_SOCK" "$SSH_AUTH_SOCK")
  fi
fi
if [[ -d /run/dbus ]]; then
  session+=(--tmpfs /run/dbus)
fi
for at in "/tmp/tmux-$UID" ${TMUX_TMPDIR:+"$TMUX_TMPDIR/tmux-$UID"}; do
  if [[ -d $at ]]; then
    session+=(--tmpfs "$at")
  fi
done
exec bwrap --dev-bind / / "${kept[@]}" "${session[@]}" "${hidden[@]}" -- bash -c "$handed"
