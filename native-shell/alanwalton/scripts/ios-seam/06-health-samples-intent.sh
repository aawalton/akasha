#!/usr/bin/env bash

SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/06-health-samples-intent"

if [[ "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/06-health-samples-intent/01-intent-declaration.sh
. "$SEAM_PART_DIR/01-intent-declaration.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/06-health-samples-intent/02-perform.sh
. "$SEAM_PART_DIR/02-perform.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/06-health-samples-intent/03-anchored-drain.sh
. "$SEAM_PART_DIR/03-anchored-drain.sh"
fi
