# shellcheck shell=bash

_be="$(readlink -f -- "${BASH_SOURCE[0]}")"
_be_dir="$(dirname -- "$_be")"
for _be_roots in \
  "$_be_dir/../repo-roots/repo-roots.shell-script.shell.sh" \
  "${AKASHA_ROOT:-$HOME/repos/akasha}/machines/provisioning/scripts/repo-roots/repo-roots.shell-script.shell.sh"
do
  # shellcheck source=/dev/null
  if [ -f "$_be_roots" ]; then . "$_be_roots"; break; fi
done
unset _be _be_dir _be_roots

_be_held="$AKASHA_ROOT/code-system/shell-scripts/pages/bash-env/bash-env.shell-script.shell.sh"
# shellcheck source=/dev/null
[ -f "$_be_held" ] && . "$_be_held"
unset _be_held

true
