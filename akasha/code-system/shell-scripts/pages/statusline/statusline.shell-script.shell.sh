#!/usr/bin/env bash

set -euo pipefail

# WHAT A SEAT STATES IS READ FROM AKASHA, BY A MODULE STANDING IN IT. What is still reached outside
# is a count of live children and a write of what the payload observed: subagents have no page here
# yet, and a writer belongs with the other writers rather than forked off into this one.
# Counting the levels up to akasha was wrong twice, because this file moved twice and the count
# did not follow. Nothing said so: a seat reader at a path that is not there answers nothing, and
# the line simply came out short. Walking up to the folder that holds the seats survives the move.
AKASHA=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)
while [ "$AKASHA" != "/" ] && [ ! -d "$AKASHA/seat-system" ]; do
  AKASHA=$(dirname "$AKASHA")
done
if [ ! -d "$AKASHA/seat-system" ]; then
  printf 'statusline: no folder above this one holds seat-system\n' >&2
  exit 1
fi
BUN_BIN=$(command -v bun || echo "$HOME/.bun/bin/bun")
SEAT_READER="$AKASHA/seat-system/seat-reading/seat-reading.module.code.ts"

INPUT=$(cat)

SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"' 2>/dev/null || echo "unknown")

AGENT_COUNT=0
if [ -n "${AGENT_ID:-}" ]; then
  AGENT_COUNT=$("$BUN_BIN" "$AKASHA/seat-system/seat-children/seat-children.module.code.ts" "$AGENT_ID" 2>/dev/null || echo 0)
  case "$AGENT_COUNT" in '' | *[!0-9]*) AGENT_COUNT=0 ;; esac
  printf '%s' "$INPUT" | "$BUN_BIN" "$AKASHA/seat-system/seat-usage-keep/seat-usage-keep.module.code.ts" "$AGENT_ID" >/dev/null 2>&1 || true
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

SEAT_RENDER=(persona role domain)

SEAT_KEYS=()
for SLOT in "${SEAT_RENDER[@]}"; do SEAT_KEYS+=("${SLOT}-slug"); done

STATED=""
while IFS= read -r HELD; do
  if [ -z "$HELD" ]; then continue; fi
  STATED="${STATED:+$STATED }$HELD"
done < <("$BUN_BIN" "$SEAT_READER" "${AGENT_ID:-$SESSION_ID}" "${SEAT_KEYS[@]}" 2>/dev/null || true)

LINE="[$AGENT_COUNT]"
if [ -n "$MODEL_DISPLAY" ]; then LINE="$LINE $MODEL_DISPLAY"; fi
if [ -n "$TOKENS_DISPLAY" ]; then LINE="$LINE $TOKENS_DISPLAY"; fi
if [ -n "$STATED" ]; then LINE="$LINE $STATED"; fi
printf '%s\n' "$LINE"
