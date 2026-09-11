#!/usr/bin/env bash

SEAM_PART_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "$KOKORO_TTS_ENABLED" == "1" ]]; then
# shellcheck source=../kokoro-plugin-declaration/alanwalton-kokoro-plugin-declaration.shell-script.shell.sh
. "$SEAM_PART_DIR/kokoro-plugin-declaration/alanwalton-kokoro-plugin-declaration.shell-script.shell.sh"
# shellcheck source=../kokoro-model-preparation/alanwalton-kokoro-model-preparation.shell-script.shell.sh
. "$SEAM_PART_DIR/kokoro-model-preparation/alanwalton-kokoro-model-preparation.shell-script.shell.sh"
# shellcheck source=../kokoro-playback-control/alanwalton-kokoro-playback-control.shell-script.shell.sh
. "$SEAM_PART_DIR/kokoro-playback-control/alanwalton-kokoro-playback-control.shell-script.shell.sh"
fi
