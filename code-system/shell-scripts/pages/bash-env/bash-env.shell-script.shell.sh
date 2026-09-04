# shellcheck shell=bash
#
# READ INTO ANOTHER SHELL'S RUN, NEVER RUN ON ITS OWN. `BASH_ENV` names this file, so every
# non-interactive bash the harness starts reads it before the first command. There is no shebang
# and no `set -e`: both belong to a script that owns its process, and this one does not.

set -o pipefail

# shellcheck source=/dev/null
[ -f "$HOME/.secrets.env" ] && . "$HOME/.secrets.env"

# A SHELL STARTED WITHOUT REMOTE CONTROL IS HANDED NO CREDENTIALS FILE, and everything that asks a
# model then refuses. The supervisor points such a shell at the signed-in account's own credentials;
# derive the same name here so a shell the supervisor did not start reaches the same file.
if [ -z "${CLAUDE_CODE_HOST_CREDS_FILE:-}" ] &&
  [ -n "${CLAUDE_CONFIG_DIR:-}" ] &&
  [ -f "$CLAUDE_CONFIG_DIR/.credentials.json" ]; then
  export CLAUDE_CODE_HOST_CREDS_FILE="$CLAUDE_CONFIG_DIR/.credentials.json"
fi

# The last command's status is what the reading shell is left holding, and a failed `[ -f ... ]`
# above would be it, so say true.
true
