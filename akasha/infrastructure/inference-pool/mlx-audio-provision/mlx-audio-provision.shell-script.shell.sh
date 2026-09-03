#!/bin/bash
set -euo pipefail

NAME="$1"
PYVER="$2"
SVC_DIR="$3"
CONDA_SH="$4"

ENV="inference-${NAME}"

if [ "$NAME" = "moss-tts" ] || [ "$NAME" = "voxcpm2" ]; then
  MLX_AUDIO_VERSION="0.4.4"
  MLX_CORE_PIN="mlx==0.31.2"
  MLX_LM_PIN="mlx-lm==0.31.3"
else
  MLX_AUDIO_VERSION="0.4.3"
  MLX_CORE_PIN="mlx==0.31.1"
  MLX_LM_PIN="mlx-lm==0.31.2"
fi

# shellcheck disable=SC1090
source "$CONDA_SH"

provision_ref_wav() {
  local ref_wav="${SVC_DIR}/ref-audio.wav"
  if [ ! -f "$ref_wav" ]; then
    echo "[${NAME}] provisioning clone reference ${ref_wav}"
    say -o "${SVC_DIR}/ref-audio.aiff" "The quick brown fox jumps over the lazy dog."
    ffmpeg -y -loglevel error -i "${SVC_DIR}/ref-audio.aiff" -ar 24000 -ac 1 "$ref_wav"
    rm -f "${SVC_DIR}/ref-audio.aiff"
  fi
}

install_mlx_audio() {
  python -m pip install "mlx-audio[$1]==${MLX_AUDIO_VERSION}" "${MLX_CORE_PIN}" "${MLX_LM_PIN}"
}

echo "[${NAME}] conda env ${ENV} (python ${PYVER})"
if ! conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  conda create -n "$ENV" -y "python=${PYVER}"
fi
conda install -n "$ENV" -y -c conda-forge ffmpeg
conda activate "$ENV"

python -m pip install --upgrade pip

case "$NAME" in
kokoro)
  echo "[kokoro] mlx-audio + Kokoro G2P stack"
  install_mlx_audio "server,tts"
  python -m pip install "misaki[en]" spacy num2words loguru
  python -m spacy download en_core_web_sm
  echo "[kokoro] pre-download mlx-community/Kokoro-82M-bf16 (~355 MB)"
  hf download "mlx-community/Kokoro-82M-bf16"
  ;;
csm)
  echo "[csm] mlx-audio (no G2P stack — CSM needs none)"
  install_mlx_audio "server,tts"
  echo "[csm] pre-download mlx-community/csm-1b (~6.2 GB)"
  hf download "mlx-community/csm-1b"
  provision_ref_wav
  ;;
whisper-stt)
  echo "[whisper-stt] mlx-audio STT extra"
  install_mlx_audio "server,stt"
  echo "[whisper-stt] pre-download mlx-community/whisper-tiny-asr-fp16 (~79 MB)"
  hf download "mlx-community/whisper-tiny-asr-fp16"
  ;;
qwen3-tts)
  echo "[qwen3-tts] mlx-audio (no G2P stack — Qwen3-TTS needs none)"
  install_mlx_audio "server,tts"
  echo "[qwen3-tts] pre-download mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16 (~4.5 GB)"
  hf download "mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16"
  ;;
voxcpm2)
  echo "[voxcpm2] mlx-audio (no G2P stack — VoxCPM2 needs none) on the isolated 0.4.4 pin"
  install_mlx_audio "server,tts"
  echo "[voxcpm2] pre-download mlx-community/VoxCPM2-bf16 (~5 GB)"
  hf download "mlx-community/VoxCPM2-bf16"
  ;;
moss-tts)
  echo "[moss-tts] mlx-audio (no G2P stack — MOSS-TTS needs none)"
  install_mlx_audio "server,tts"
  echo "[moss-tts] pre-download OpenMOSS-Team/MOSS-TTS-v1.5 (~17 GB, full-precision)"
  hf download "OpenMOSS-Team/MOSS-TTS-v1.5"
  echo "[moss-tts] expose MOSS-TTS continuation mode -> SpeechRequest.mode"
  python - <<'PYEOF'
import importlib.metadata as md
import os

base = str(md.distribution("mlx-audio").locate_file("mlx_audio"))
server_py = os.path.join(base, "server.py")


def patch(path, old, new, sentinel):
    rel = os.path.relpath(path, base)
    with open(path, encoding="utf-8") as f:
        src = f.read()
    if sentinel in src:
        print(f"  already patched mlx_audio/{rel}")
        return
    if old not in src:
        raise SystemExit(f"patch target not found in mlx_audio/{rel}: {old!r}")
    with open(path, "w", encoding="utf-8") as f:
        f.write(src.replace(old, new, 1))
    print(f"  patched mlx_audio/{rel}")


patch(
    server_py,
    "    ref_text: str | None = None",
    "    ref_text: str | None = None\n    mode: str | None = None",
    "mode: str | None = None",
)
patch(
    server_py,
    '            "verbose": speech_request.verbose,\n'
    "        }",
    '            "verbose": speech_request.verbose,\n'
    "        }\n"
    "        if speech_request.mode is not None:\n"
    '            generate_kwargs["mode"] = speech_request.mode',
    'generate_kwargs["mode"]',
)
PYEOF
  provision_ref_wav
  ;;
higgs-audio)
  echo "[higgs-audio] mlx-audio (no G2P stack — Higgs Audio v2 needs none)"
  install_mlx_audio "server,tts"
  echo "[higgs-audio] pre-download mlx-community/higgs-audio-v2-3B-mlx-q8 (~6.2 GB)"
  hf download "mlx-community/higgs-audio-v2-3B-mlx-q8"
  provision_ref_wav
  ;;
*)
  echo "[mlx-audio] unknown service name: ${NAME}" >&2
  exit 1
  ;;
esac

echo "[${NAME}] provisioning complete"
