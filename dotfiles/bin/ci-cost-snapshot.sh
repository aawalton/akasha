#!/usr/bin/env bash
set -euo pipefail

SESSION_ID="${1:-}"

if [ -z "$SESSION_ID" ]; then
  echo '{}'
  exit 0
fi

TOOLS=$(cd "$(dirname "${BASH_SOURCE[0]}")/../../tools" && pwd -P)
BUN_BIN=$(command -v bun || echo "$HOME/.bun/bin/bun")

. "$TOOLS/lib/seat-page-read.sh"

SEAT_FILE=$(seat_page_file "$SESSION_ID")
AGENT_ID=$(seat_page_value "$SEAT_FILE" id)

if [ -z "$AGENT_ID" ]; then
  echo '{}'
  exit 0
fi

"$BUN_BIN" "$TOOLS/lib/seat-usage-show.ts" "$AGENT_ID"
