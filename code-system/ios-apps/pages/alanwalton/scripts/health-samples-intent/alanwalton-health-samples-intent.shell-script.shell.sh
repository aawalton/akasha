#!/usr/bin/env bash

SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then
# shellcheck source=akasha/code-system/ios-apps/pages/alanwalton/scripts/health-intent-declaration/alanwalton-health-intent-declaration.shell-script.shell.sh
. "$SEAM_PART_DIR/alanwalton-health-intent-declaration/alanwalton-health-intent-declaration.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-apps/pages/alanwalton/scripts/health-intent-perform/alanwalton-health-intent-perform.shell-script.shell.sh
. "$SEAM_PART_DIR/alanwalton-health-intent-perform/alanwalton-health-intent-perform.shell-script.shell.sh"
# shellcheck source=akasha/code-system/ios-apps/pages/alanwalton/scripts/health-intent-anchored-drain/alanwalton-health-intent-anchored-drain.shell-script.shell.sh
. "$SEAM_PART_DIR/alanwalton-health-intent-anchored-drain/alanwalton-health-intent-anchored-drain.shell-script.shell.sh"
fi
