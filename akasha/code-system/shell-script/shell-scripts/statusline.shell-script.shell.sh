#!/usr/bin/env bash

set -euo pipefail

# THE CODE THIS RUNS STANDS OUTSIDE AKASHA AND IS REACHED BY NAMING ITS PATH. Nothing under
# `akasha/` imports what is tracked outside it, and this does not import: it names a path and runs
# it. The reach goes when the seat readers move in. Until then, saying where they are beats keeping
# a second reader here, which would drift from them the way the three hand-rolled ones did.
REPO=$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd -P)

INPUT=$(cat)

SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"' 2>/dev/null || echo "unknown")

AGENT_COUNT=0
if [ -n "${AGENT_ID:-}" ]; then
  HERE="$REPO/tools"
  BUN_BIN=$(command -v bun || echo "$HOME/.bun/bin/bun")
  AGENT_COUNT=$("$BUN_BIN" "$HERE/lib/seat-children-live.ts" "$AGENT_ID" 2>/dev/null || echo 0)
  case "$AGENT_COUNT" in '' | *[!0-9]*) AGENT_COUNT=0 ;; esac
  printf '%s' "$INPUT" | "$BUN_BIN" "$HERE/lib/seat-usage-keep.ts" "$AGENT_ID" >/dev/null 2>&1 || true
fi

MODEL_DISPLAY=""
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // empty' 2>/dev/null || true)
if [ -n "$TRANSCRIPT_PATH" ] && [ -f "$TRANSCRIPT_PATH" ]; then
  WIRE=$(tail -c 65536 "$TRANSCRIPT_PATH" 2>/dev/null \
    | grep -oE '"model":"claude-[^"]*"' \
    | tail -1 \
    | sed -E 's/^"model":"//; s/"$//' || true)
  if [ -n "$WIRE" ]; then
    BASE=${WIRE#claude-}
    EXT=""
    case "$BASE" in
      *"[1m]") EXT="[1m]"; BASE=${BASE%"[1m]"} ;;
    esac
    LOGICAL=${BASE%%-*}
    if [ -n "$LOGICAL" ]; then
      MODEL_DISPLAY="${LOGICAL}${EXT}"
    fi
  fi
fi

TOKENS_DISPLAY=$(echo "$INPUT" | jq -r '
  (.context_window.total_input_tokens // empty) as $t
  | if ($t | type) != "number" then empty
    elif $t < 1000 then ($t | floor | tostring)
    elif $t < 1000000 then (($t / 1000) | round | tostring) + "k"
    else (((($t / 100000) | round) / 10) | tostring) + "m"
    end
' 2>/dev/null || true)

SEAT_RENDER=(persona domain role initiative)

. "$REPO/tools/lib/seat-page-read.sh"

SEAT_FILE=$(seat_page_file "${AGENT_ID:-$SESSION_ID}")
STATED=""
for SLOT in "${SEAT_RENDER[@]}"; do
  case "$SLOT" in
    initiative) SEAT_KEY="$SEAT_INITIATIVE_KEY" ;;
    *) SEAT_KEY="${SLOT}-slug" ;;
  esac
  HELD=$(seat_page_value "$SEAT_FILE" "$SEAT_KEY")
  if [ -z "$HELD" ]; then continue; fi
  STATED="${STATED:+$STATED }$HELD"
done

LINE="[$AGENT_COUNT]"
if [ -n "$MODEL_DISPLAY" ]; then LINE="$LINE $MODEL_DISPLAY"; fi
if [ -n "$TOKENS_DISPLAY" ]; then LINE="$LINE $TOKENS_DISPLAY"; fi
if [ -n "$STATED" ]; then LINE="$LINE $STATED"; fi
printf '%s\n' "$LINE"
