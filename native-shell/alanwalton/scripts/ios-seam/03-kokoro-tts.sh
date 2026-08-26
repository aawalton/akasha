#!/usr/bin/env bash

SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/03-kokoro-tts"

if [[ "$KOKORO_TTS_ENABLED" == "1" ]]; then
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/03-kokoro-tts/01-plugin-declaration.sh
. "$SEAM_PART_DIR/01-plugin-declaration.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/03-kokoro-tts/02-model-preparation.sh
. "$SEAM_PART_DIR/02-model-preparation.sh"
# shellcheck source=native-shell/alanwalton/scripts/ios-seam/03-kokoro-tts/03-playback-control.sh
. "$SEAM_PART_DIR/03-playback-control.sh"
fi
