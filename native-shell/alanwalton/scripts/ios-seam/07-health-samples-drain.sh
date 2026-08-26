#!/usr/bin/env bash

SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/07-health-samples-drain"

if [[ "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/07-health-samples-drain/01-anchored-read.sh
. "$SEAM_PART_DIR/01-anchored-read.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/07-health-samples-drain/02-cursorless-backstop.sh
. "$SEAM_PART_DIR/02-cursorless-backstop.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/07-health-samples-drain/03-route-request.sh
. "$SEAM_PART_DIR/03-route-request.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/07-health-samples-drain/04-remembered-state.sh
. "$SEAM_PART_DIR/04-remembered-state.sh"
echo "OK: appended StreamHealthSamplesIntent to $APPDELEGATE"
else
echo "OK: stream-health-samples app intent seam SKIPPED — NATIVE_SHELL_HEALTH_SAMPLES_INTENT=0 (no Swift appended)."
fi
