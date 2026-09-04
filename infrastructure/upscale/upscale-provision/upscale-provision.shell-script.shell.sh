#!/usr/bin/env bash
set -euo pipefail

IMAGE="${UPSCALE_IMAGE:-upscale:local}"
DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"
STAGE="${1:-${STAGE:-all}}"

if ! command -v podman >/dev/null 2>&1; then
  echo "ERROR: podman not found on PATH." >&2
  exit 1
fi
if ! podman image exists "$IMAGE"; then
  echo "ERROR: image $IMAGE not built. Run shell-script/upscale-up first." >&2
  exit 1
fi

mkdir -p "$DATA/models" "$DATA/cache"

podman run --rm -i \
  -e "STAGE=$STAGE" \
  -e HF_HUB_DISABLE_XET=1 \
  -v "$DATA/models:/models:z" \
  -v "$DATA/cache:/root/.cache:z" \
  "$IMAGE" python - <<'PY'
import os
import shutil
import sys

from huggingface_hub import hf_hub_download

STAGE = os.environ.get("STAGE", "all")

# (stage, repo_id, repo-relative filename, models subdir, flat destination name).
# Filenames verified against the HF repo listings on 2026-07-04. The 16 GB-fit
# lean set: SeedVR2 7B mixed-FP8 (last block FP16, ~8.5 GB) for stage 1; SRPO
# Q6_K GGUF (~9.9 GB) + FP8 t5xxl + clip_l + FLUX ae for the stage-2 skin
# inpaint. SeedVR2 weights land in models/SEEDVR2 (the numz node's convention).
FILES = [
    # --- stage 1: SeedVR2 v2.5 ---
    (
        "seedvr2",
        "AInVFX/SeedVR2_comfyUI",
        "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16.safetensors",
        "SEEDVR2",
        "seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16.safetensors",
    ),
    (
        "seedvr2",
        "numz/SeedVR2_comfyUI",
        "ema_vae_fp16.safetensors",
        "SEEDVR2",
        "ema_vae_fp16.safetensors",
    ),
    # --- stage 2: SRPO (FLUX.1-dev preference fine-tune) skin inpaint ---
    (
        "srpo",
        "befox/SRPO-GGUF",
        "srpo-Q6_K.gguf",
        "unet",
        "srpo-Q6_K.gguf",
    ),
    (
        "srpo",
        "comfyanonymous/flux_text_encoders",
        "t5xxl_fp8_e4m3fn.safetensors",
        "text_encoders",
        "t5xxl_fp8_e4m3fn.safetensors",
    ),
    (
        "srpo",
        "comfyanonymous/flux_text_encoders",
        "clip_l.safetensors",
        "text_encoders",
        "clip_l.safetensors",
    ),
    (
        "srpo",
        "ffxvs/vae-flux",
        "ae.safetensors",
        "vae",
        "ae.safetensors",
    ),
]

TMP = "/models/.hf-tmp"
downloaded = 0
skipped = 0
selected = 0
for stage, repo_id, filename, subdir, dest_name in FILES:
    if STAGE != "all" and stage != STAGE:
        continue
    selected += 1
    dest_dir = os.path.join("/models", subdir)
    os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, dest_name)
    if os.path.exists(dest):
        print(f"skip      {subdir}/{dest_name}", file=sys.stderr)
        skipped += 1
        continue
    print(f"download  {subdir}/{dest_name}  ({repo_id})", file=sys.stderr)
    # local_dir keeps the partial download on the models filesystem so the
    # final os.replace into place is an atomic same-device rename.
    path = hf_hub_download(repo_id=repo_id, filename=filename, local_dir=TMP)
    os.replace(path, dest)
    downloaded += 1

shutil.rmtree(TMP, ignore_errors=True)
print(f"provisioned [{STAGE}]: {downloaded} downloaded, {skipped} skipped, {selected} selected")
PY
