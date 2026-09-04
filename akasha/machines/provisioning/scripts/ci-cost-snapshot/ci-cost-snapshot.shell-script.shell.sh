#!/usr/bin/env bash
set -euo pipefail

SESSION_ID="${1:-}"

if [ -z "$SESSION_ID" ]; then
  echo '{}'
  exit 0
fi

REPO=$(cd "$(dirname "$(readlink -f -- "${BASH_SOURCE[0]}")")/../../../../.." && pwd -P)
BUN_BIN=$(command -v bun || echo "$HOME/.bun/bin/bun")

# A SESSION UUID IS ALL THIS IS GIVEN, and `seat-reading` takes it as readily as an agent id. It
# stands in akasha and reads the seat page there, so the shell parser this used to source — the last
# of the three that could not see a flat scalar — has no callers left.
AGENT_ID=$("$BUN_BIN" "$REPO/akasha/seat-system/seat-reading/seat-reading.module.code.ts" \
  "$SESSION_ID" id 2>/dev/null || true)

if [ -z "$AGENT_ID" ]; then
  echo '{}'
  exit 0
fi

"$BUN_BIN" "$REPO/akasha/seat-system/seat-usage-show/seat-usage-show.module.code.ts" "$AGENT_ID"
