# shellcheck shell=bash

_be="$(readlink -f -- "${BASH_SOURCE[0]}")"
_be_dir="$(dirname -- "$_be")"
for _be_roots in \
  "$_be_dir/../tools/lib/repo-roots.sh" \
  "${AKASHA_ROOT:-$HOME/repos/akasha}/tools/lib/repo-roots.sh"
do
  # shellcheck source=/dev/null
  if [ -f "$_be_roots" ]; then . "$_be_roots"; break; fi
done
unset _be _be_dir _be_roots

# shellcheck source=/dev/null
[ -f "$AKASHA_ROOT/tools/bash-env.sh" ] && . "$AKASHA_ROOT/tools/bash-env.sh"

true
