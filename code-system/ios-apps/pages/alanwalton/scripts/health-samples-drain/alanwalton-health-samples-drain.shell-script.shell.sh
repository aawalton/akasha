#!/usr/bin/env bash

SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then
# shellcheck source=../health-anchored-read/alanwalton-health-anchored-read.shell-script.shell.sh
. "$SEAM_PART_DIR/health-anchored-read/alanwalton-health-anchored-read.shell-script.shell.sh"
# shellcheck source=../health-cursorless-backstop/alanwalton-health-cursorless-backstop.shell-script.shell.sh
. "$SEAM_PART_DIR/health-cursorless-backstop/alanwalton-health-cursorless-backstop.shell-script.shell.sh"
# shellcheck source=../health-route-request/alanwalton-health-route-request.shell-script.shell.sh
. "$SEAM_PART_DIR/health-route-request/alanwalton-health-route-request.shell-script.shell.sh"
# shellcheck source=../health-remembered-state/alanwalton-health-remembered-state.shell-script.shell.sh
. "$SEAM_PART_DIR/health-remembered-state/alanwalton-health-remembered-state.shell-script.shell.sh"
echo "OK: appended StreamHealthSamplesIntent to $APPDELEGATE"
else
echo "OK: stream-health-samples app intent seam SKIPPED — NATIVE_SHELL_HEALTH_SAMPLES_INTENT=0 (no Swift appended)."
fi
