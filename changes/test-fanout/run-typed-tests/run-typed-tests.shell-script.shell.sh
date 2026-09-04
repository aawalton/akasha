#!/usr/bin/env bash

set -e -o pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")" && pwd -P)"
FANOUT_DIR="$(dirname -- "$SCRIPT_DIR")"

WORKSPACE_ROOT="$1"
TEST_TYPE="$2"
INPUTS_HASH="$3"

if [ -z "$WORKSPACE_ROOT" ] || [ -z "$TEST_TYPE" ] || [ -z "$INPUTS_HASH" ]; then
  echo "[run-typed-tests] missing args: expected <workspace-root> <test-type> <inputs-hash> — refusing" >&2
  exit 1
fi

case "$TEST_TYPE" in
  unit | property | component) ;;
  *)
    echo "[run-typed-tests] invalid test-type '$TEST_TYPE' (expected unit|property|component) — refusing" >&2
    exit 1
    ;;
esac

declare -A TYPE_PARALLELISM=( [unit]=12 [property]=12 [component]=12 )
PARALLELISM="${TYPE_PARALLELISM[$TEST_TYPE]:-12}"

cd "${WORKSPACE_ROOT}"

BEARING_ROOTS=$(bun "${FANOUT_DIR}/typed-workspace-listing/typed-workspace-listing.module.code.ts" \
  "${WORKSPACE_ROOT}" "${TEST_TYPE}")

if [ -z "$BEARING_ROOTS" ]; then
  echo "[run-typed-tests] ${TEST_TYPE}: NO test-bearing workspaces — the derivation that names them returned an empty set over this checkout, so this step executed no test and has no verdict to report — refusing" >&2
  exit 2
fi

export TYPED_TEST_BEARING_ROOTS="$BEARING_ROOTS"

COUNT=$(echo "$BEARING_ROOTS" | wc -l)

FANOUT_LOG="$(mktemp)"
echo "[run-typed-tests] ${TEST_TYPE}: ${COUNT} test-bearing workspace(s), fan-out -P ${PARALLELISM}" \
  | tee "$FANOUT_LOG"

CRASH_LIST="$(mktemp)"
ASSERTED_COUNTS="$(mktemp)"
trap 'rm -f "$CRASH_LIST" "$FANOUT_LOG" "$ASSERTED_COUNTS"' EXIT
export CRASH_LIST_FILE="$CRASH_LIST"
export ASSERTED_COUNT_FILE="$ASSERTED_COUNTS"

attribute_failure() {
  bun "${FANOUT_DIR}/fanout-failure-attribution/fanout-failure-attribution.module.code.ts" \
    --log "$FANOUT_LOG" --test-type "$TEST_TYPE" >&2 || true
}

WORKSPACE_TESTS_SH="${FANOUT_DIR}/run-workspace-tests/run-workspace-tests.shell-script.shell.sh"

set +e
echo "$BEARING_ROOTS" \
  | xargs -P "$PARALLELISM" -I {} \
    bash "${WORKSPACE_TESTS_SH}" \
      "${WORKSPACE_ROOT}" "{}" "${INPUTS_HASH}" "${TEST_TYPE}" \
  | tee -a "$FANOUT_LOG"
PHASE1_RC="${PIPESTATUS[1]}"
set -e

ASSERTED_FILES=$(awk '{ total += $1 } END { print total + 0 }' "$ASSERTED_COUNTS")
REPORTING_SHARDS=$(wc -l < "$ASSERTED_COUNTS")
echo "[run-typed-tests] ${TEST_TYPE}: ${ASSERTED_FILES} test file(s) asserted across ${REPORTING_SHARDS} of ${COUNT} shard(s)"

unset ASSERTED_COUNT_FILE

if [ "$PHASE1_RC" -ne 0 ]; then
  echo "[run-typed-tests] ${TEST_TYPE}: genuine failure in concurrent phase (exit ${PHASE1_RC}) — ejecting" >&2
  attribute_failure
  exit "$PHASE1_RC"
fi

if [ ! -s "$CRASH_LIST" ]; then
  echo "[run-typed-tests] ${TEST_TYPE}: all shards green under batch load"
  exit 0
fi

CRASHED=$(sort -u "$CRASH_LIST")
CRASH_COUNT=$(echo "$CRASHED" | wc -l)
echo "[run-typed-tests] ${TEST_TYPE}: ${CRASH_COUNT} shard(s) crashed under batch load — re-running SERIALLY in isolation:"
while IFS= read -r crashed_pkg; do
  echo "[run-typed-tests]   - ${crashed_pkg}"
done <<<"$CRASHED"

unset CRASH_LIST_FILE
PHASE2_RC=0
while IFS= read -r pkg; do
  [ -z "$pkg" ] && continue
  echo "[run-typed-tests] ${TEST_TYPE}: isolated re-run of ${pkg}"
  set +e
  bash "${WORKSPACE_TESTS_SH}" \
    "${WORKSPACE_ROOT}" "${pkg}" "${INPUTS_HASH}" "${TEST_TYPE}" \
    | tee -a "$FANOUT_LOG"
  RERUN_RC="${PIPESTATUS[0]}"
  set -e
  if [ "$RERUN_RC" -ne 0 ]; then
    PHASE2_RC="$RERUN_RC"
  fi
done <<< "$CRASHED"

if [ "$PHASE2_RC" -ne 0 ]; then
  echo "[run-typed-tests] ${TEST_TYPE}: a crashed shard REPRODUCED its failure in isolation (exit ${PHASE2_RC}) — ejecting" >&2
  attribute_failure
  exit "$PHASE2_RC"
fi
echo "[run-typed-tests] ${TEST_TYPE}: all crashed shards passed in isolation — batch-load crash absorbed"
