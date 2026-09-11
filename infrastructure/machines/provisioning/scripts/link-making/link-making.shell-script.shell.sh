#!/usr/bin/env bash

LINK_DANGLING_COUNT=0
LINK_DANGLING_REPORT=""

link_report_dangling() {
  local target="$1" link_path="$2" disposition="$3"
  LINK_DANGLING_COUNT=$((LINK_DANGLING_COUNT + 1))
  LINK_DANGLING_REPORT="${LINK_DANGLING_REPORT}    ${link_path} -> ${target}
"
  echo "  DANGLING ($disposition): $link_path -> $target — target does not exist" >&2
}

link_verify() {
  local target="$1" link_path="$2" disposition="$3"
  if [ -e "$link_path" ]; then
    if [ "$disposition" = "created" ]; then
      echo "  $link_path -> $target"
    fi
    return 0
  fi
  link_report_dangling "$target" "$link_path" "$disposition"
}

link() {
  local target="$1" link_path="$2"
  if [ -L "$link_path" ] && [ "$(readlink "$link_path")" = "$target" ]; then
    link_verify "$target" "$link_path" "already present"
    return
  fi
  if [ -e "$link_path" ] && [ ! -L "$link_path" ]; then
    mv "$link_path" "${link_path}.bak"
    echo "  backed up $link_path -> ${link_path}.bak"
  fi
  [ -L "$link_path" ] && rm "$link_path"
  mkdir -p "$(dirname "$link_path")"
  ln -s "$target" "$link_path"
  link_verify "$target" "$link_path" "created"
}

link_summary() {
  if [ "$LINK_DANGLING_COUNT" -eq 0 ]; then
    return 0
  fi
  {
    echo ""
    echo "WARNING: $LINK_DANGLING_COUNT managed symlink(s) point at a target that does not exist:"
    printf '%s' "$LINK_DANGLING_REPORT"
    echo "  Each reads as present and follows to nothing, so anything reading through"
    echo "  one gets an absence rather than an error naming this."
    echo "  Resolve each by creating the target or dropping its declaration."
  } >&2
}
