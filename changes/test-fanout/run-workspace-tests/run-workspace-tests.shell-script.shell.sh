#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")" && pwd -P)"
FANOUT_DIR="$(dirname -- "$SCRIPT_DIR")"

WORKSPACE_ROOT="$1"
PKG_ROOT="$2"
INPUTS_HASH="$3"
TEST_TYPE="${4:-}"

if [ -z "$WORKSPACE_ROOT" ] || [ -z "$PKG_ROOT" ] || [ -z "$INPUTS_HASH" ]; then
  echo "[run-workspace-tests] missing args: expected <workspace-root> <pkg-root> <inputs-hash> [<test-type>] — refusing" >&2
  exit 1
fi

if [ -n "$TEST_TYPE" ]; then
  case "$TEST_TYPE" in
    unit | property | component) ;;
    *)
      echo "[run-workspace-tests] invalid test-type '$TEST_TYPE' (expected unit|property|component) — refusing" >&2
      exit 1
      ;;
  esac
fi

MAP_PATH="/ci-storage/reverse-reachability/${INPUTS_HASH}.json"
CHANGED_PATH="${WORKSPACE_ROOT}/.ci/changed-files.txt"

BUN_TEST_ARGS=(--timeout=30000)
if [ -n "$TEST_TYPE" ]; then
  CI_TEST_REGEX="\\.${TEST_TYPE}\\.test\\."
else
  CI_TEST_REGEX='\.(unit|property|component)\.test\.'
fi

FIXTURE_PATH_REGEX='(^|/)__fixtures__/'

tag_producer_lines() {
  while IFS= read -r line || [ -n "$line" ]; do
    printf '[fanout-ws:%s] %s\n' "$PKG_ROOT" "$line"
  done
}

run_bun_test_gated() {
  local files
  files="$(cat)"
  [ -z "$files" ] && return 0

  local out rc expected
  expected="$(printf '%s\n' "$files" | sed '/^$/d' | sort -u | wc -l)"
  out="$(mktemp)"
  set +e
  printf '%s\n' "$files" | xargs bun test "${BUN_TEST_ARGS[@]}" 2>&1 | tee "$out" |
    tag_producer_lines
  rc="${PIPESTATUS[1]}"
  bun "${FANOUT_DIR}/bun-exit-gating/bun-exit-gating.module.code.ts" \
    --exit-code "$rc" --output-file "$out" --expected-files "$expected"
  rc="$?"
  set -e
  rm -f "$out"
  if [ "$rc" -eq 75 ] && [ -n "${CRASH_LIST_FILE:-}" ]; then
    echo "[run-workspace-tests] ${PKG_ROOT}: shard CRASHED under batch load (signal/OOM, no summary) — deferring to isolated serial re-run" >&2
    echo "${PKG_ROOT}" >> "$CRASH_LIST_FILE"
    return 0
  fi
  return "$rc"
}

cd "${WORKSPACE_ROOT}/${PKG_ROOT}"

if [ -z "${TYPED_TEST_BEARING_ROOTS+x}" ]; then
  echo "[run-workspace-tests] ${PKG_ROOT}: TYPED_TEST_BEARING_ROOTS is unset, so the workspace roots nested beneath this one cannot be pruned and their files would run twice — refusing" >&2
  exit 2
fi

NESTED_PRUNE=()
while IFS= read -r bearing_root; do
  case "$bearing_root" in
    "${PKG_ROOT}"/?*) NESTED_PRUNE+=(-path "./${bearing_root#"${PKG_ROOT}"/}" -prune -o) ;;
  esac
done <<< "$TYPED_TEST_BEARING_ROOTS"

enumerate_workspace_tests() {
  find . "${NESTED_PRUNE[@]}" -type d -name node_modules -prune -o \
    -type f \( -name '*.test.ts' -o -name '*.test.tsx' \) -print \
    | grep -E "$CI_TEST_REGEX" \
    | grep -Ev "$FIXTURE_PATH_REGEX" \
    || true
}

record_asserted_count() {
  if [ -n "${ASSERTED_COUNT_FILE:-}" ]; then
    echo "$1" >> "$ASSERTED_COUNT_FILE"
  fi
  return 0
}

refuse_empty_enumeration() {
  echo "[run-workspace-tests] ${PKG_ROOT}: NO eligible test files, though the derivation that selected this workspace found files of this type in it — this worker executed no test and has no verdict to report — refusing" >&2
  exit 2
}

if [ ! -f "$MAP_PATH" ] || [ ! -f "$CHANGED_PATH" ]; then
  FILES=$(enumerate_workspace_tests)
  if [ -z "$FILES" ]; then
    refuse_empty_enumeration
  fi
  record_asserted_count "$(echo "$FILES" | wc -l)"
  echo "$FILES" | run_bun_test_gated
  exit $?
fi

SELECTED=$(bun "${FANOUT_DIR}/test-selection/test-selection.module.code.ts" \
  --map "$MAP_PATH" \
  --pkg-root "$PKG_ROOT" \
  --changed-files "$CHANGED_PATH")

if [ "$SELECTED" = "__RUN_ALL__" ]; then
  FILES=$(enumerate_workspace_tests)
  if [ -z "$FILES" ]; then
    refuse_empty_enumeration
  fi
  COUNT=$(echo "$FILES" | wc -l)
  record_asserted_count "$COUNT"
  echo "[run-workspace-tests] ${PKG_ROOT}: running all ${COUNT} eligible test file(s)"
  echo "$FILES" | run_bun_test_gated
  exit $?
fi

SELECTED=$(echo "$SELECTED" | grep -E "$CI_TEST_REGEX" | grep -Ev "$FIXTURE_PATH_REGEX" || true)

if [ -z "$SELECTED" ]; then
  record_asserted_count 0
  echo "[run-workspace-tests] ${PKG_ROOT}: no test files reached by changed files — skipping"
  exit 0
fi

COUNT=$(echo "$SELECTED" | wc -l)
record_asserted_count "$COUNT"
echo "[run-workspace-tests] ${PKG_ROOT}: running ${COUNT} selected test file(s)"
echo "$SELECTED" | run_bun_test_gated
exit $?
