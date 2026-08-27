#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: find-session.sh <session-id-or-prefix>" >&2
  exit 1
fi

query="$1"

find_jsonl() {
  find "$1" -name "${query}*.jsonl" -type f 2>/dev/null
}

matches=()
while IFS= read -r path; do
  matches+=("$path")
done < <(
  find_jsonl "$HOME/.claude/projects"
  for account_dir in "$HOME"/.claude/accounts/*/projects; do
    [[ -d "$account_dir" ]] && find_jsonl "$account_dir"
  done
)

if [[ ${#matches[@]} -gt 0 ]]; then
  printf '%s\n' "${matches[@]}"
  exit 0
fi

for meta in "$HOME"/.claude/accounts/*/sessions/*.json; do
  [[ -f "$meta" ]] || continue
  sid=$(python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('sessionId',''))" < "$meta" 2>/dev/null)
  if [[ "$sid" == *"$query"* ]]; then
    account_dir=$(dirname "$(dirname "$meta")")
    cwd=$(python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('cwd',''))" < "$meta" 2>/dev/null)
    encoded="${cwd//\//-}"
    jsonl="$account_dir/projects/$encoded/$sid.jsonl"
    if [[ -f "$jsonl" ]]; then
      echo "$jsonl"
      exit 0
    fi
  fi
done

echo "No session found for: $query" >&2
exit 1
