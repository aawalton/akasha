#!/usr/bin/env bash
set -euo pipefail

IMAGE="${WAN_IMAGE:-wan:local}"
DATA="${WAN_HOME:-$HOME/.local/share/wan}"

if ! command -v podman >/dev/null 2>&1; then
  echo "ERROR: podman not found on PATH." >&2
  exit 1
fi
if ! podman image exists "$IMAGE"; then
  echo "ERROR: image $IMAGE not built. Run shell-script/wan-up first." >&2
  exit 1
fi

mkdir -p "$DATA/models" "$DATA/cache"

podman run --rm -i \
  -v "$DATA/models:/models:Z" \
  -v "$DATA/cache:/root/.cache:Z" \
  "$IMAGE" python - <<'PY'
import os
import shutil
import sys

from huggingface_hub import hf_hub_download

# (repo_id, repo-relative filename, models subdir, flat destination name).
# Filenames verified against the HF repo listings on 2026-06-12; the Lightning
# LoRAs ship as generic high/low_noise_model.safetensors inside a versioned
# dir, so they are renamed to self-describing flat names on landing.
FILES = [
    (
        "QuantStack/Wan2.2-I2V-A14B-GGUF",
        "HighNoise/Wan2.2-I2V-A14B-HighNoise-Q5_K_M.gguf",
        "unet",
        "Wan2.2-I2V-A14B-HighNoise-Q5_K_M.gguf",
    ),
    (
        "QuantStack/Wan2.2-I2V-A14B-GGUF",
        "LowNoise/Wan2.2-I2V-A14B-LowNoise-Q5_K_M.gguf",
        "unet",
        "Wan2.2-I2V-A14B-LowNoise-Q5_K_M.gguf",
    ),
    # Q3_K_M experts (~7.2 GB each): the --lightning iteration path. Smaller so
    # the active expert stays resident on the 16 GB card (no per-step offload).
    (
        "QuantStack/Wan2.2-I2V-A14B-GGUF",
        "HighNoise/Wan2.2-I2V-A14B-HighNoise-Q3_K_M.gguf",
        "unet",
        "Wan2.2-I2V-A14B-HighNoise-Q3_K_M.gguf",
    ),
    (
        "QuantStack/Wan2.2-I2V-A14B-GGUF",
        "LowNoise/Wan2.2-I2V-A14B-LowNoise-Q3_K_M.gguf",
        "unet",
        "Wan2.2-I2V-A14B-LowNoise-Q3_K_M.gguf",
    ),
    (
        "Comfy-Org/Wan_2.1_ComfyUI_repackaged",
        "split_files/text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors",
        "text_encoders",
        "umt5_xxl_fp8_e4m3fn_scaled.safetensors",
    ),
    (
        "Comfy-Org/Wan_2.2_ComfyUI_Repackaged",
        "split_files/vae/wan_2.1_vae.safetensors",
        "vae",
        "wan_2.1_vae.safetensors",
    ),
    (
        "lightx2v/Wan2.2-Lightning",
        "Wan2.2-I2V-A14B-4steps-lora-rank64-Seko-V1/high_noise_model.safetensors",
        "loras",
        "Wan2.2-I2V-A14B-4steps-lora-rank64-Seko-V1-high_noise.safetensors",
    ),
    (
        "lightx2v/Wan2.2-Lightning",
        "Wan2.2-I2V-A14B-4steps-lora-rank64-Seko-V1/low_noise_model.safetensors",
        "loras",
        "Wan2.2-I2V-A14B-4steps-lora-rank64-Seko-V1-low_noise.safetensors",
    ),
]

TMP = "/models/.hf-tmp"
downloaded = 0
skipped = 0
for repo_id, filename, subdir, dest_name in FILES:
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
print(f"provisioned: {downloaded} downloaded, {skipped} skipped, {len(FILES)} total")
PY
