#!/usr/bin/env bash

set -eu

ROOT="${REPOS_ROOT:-$HOME/repos}"

cd "$ROOT"

total=0
for _ in $(seq 1 20); do
  gone=$(find . -type d -empty -not -path "*/.git/*" -not -path "*/node_modules/*" -not -regex "\./[^/]*/pages/[^/]*" -print -delete 2>/dev/null | wc -l) || true
  [ "$gone" -eq 0 ] && break
  total=$((total + gone))
done

echo "repos-empty-dir-purge: $total empty directories under $ROOT are gone"
