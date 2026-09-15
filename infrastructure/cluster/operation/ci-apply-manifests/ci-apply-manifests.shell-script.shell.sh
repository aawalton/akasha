#!/bin/sh
set -eu

DIFF_MODE=0
LINT_MODE=0
EXCLUDES=""

while [ $# -gt 0 ]; do
  case "$1" in
    --diff)
      DIFF_MODE=1
      shift
      ;;
    --lint)
      LINT_MODE=1
      shift
      ;;
    --exclude)
      if [ -n "$EXCLUDES" ]; then
        EXCLUDES="$EXCLUDES|$2"
      else
        EXCLUDES="$2"
      fi
      shift 2
      ;;
    *)
      break
      ;;
  esac
done

NAMESPACE="$1"
MANIFESTS_DIR="$2"

if [ -n "$EXCLUDES" ]; then
  FILES=$(find "${WORKSPACE:?WORKSPACE must be set}/$MANIFESTS_DIR" \( -name '*.yaml' -o -name '*.yml' \) | grep -v -E "$EXCLUDES" || true)
  if [ -z "$FILES" ]; then
    echo "No manifest files remain after exclusions"
    exit 0
  fi
  F_ARGS=""
  for f in $FILES; do
    F_ARGS="$F_ARGS -f $f"
  done
  if [ "$LINT_MODE" -eq 1 ]; then
    echo "LINT: $NAMESPACE $MANIFESTS_DIR"
    for f in $FILES; do
      echo "$f"
    done
    exit 0
  fi
  if [ "$DIFF_MODE" -eq 1 ]; then
    rc=0
    # shellcheck disable=SC2086  # Intentional word-splitting: F_ARGS holds multiple "-f path" tokens (POSIX sh has no arrays)
    kubectl diff -n "$NAMESPACE" $F_ARGS || rc=$?
    if [ "$rc" -gt 1 ]; then echo "kubectl diff failed (exit $rc)"; exit 1; fi
    echo "Diff check passed"
  else
    # shellcheck disable=SC2086  # Intentional word-splitting: F_ARGS holds multiple "-f path" tokens (POSIX sh has no arrays)
    kubectl apply -n "$NAMESPACE" $F_ARGS
  fi
else
  if [ "$LINT_MODE" -eq 1 ]; then
    echo "LINT: $NAMESPACE $MANIFESTS_DIR (no excludes)"
    find "${WORKSPACE:?WORKSPACE must be set}/$MANIFESTS_DIR" \( -name '*.yaml' -o -name '*.yml' \)
    exit 0
  fi
  if [ "$DIFF_MODE" -eq 1 ]; then
    rc=0; kubectl diff -n "$NAMESPACE" -R -f "${WORKSPACE:?WORKSPACE must be set}/$MANIFESTS_DIR" || rc=$?
    if [ "$rc" -gt 1 ]; then echo "kubectl diff failed (exit $rc)"; exit 1; fi
    echo "Diff check passed"
  else
    kubectl apply -n "$NAMESPACE" -R -f "${WORKSPACE:?WORKSPACE must be set}/$MANIFESTS_DIR"
  fi
fi
