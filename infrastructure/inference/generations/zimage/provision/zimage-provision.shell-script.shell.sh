#!/usr/bin/env bash
set -euo pipefail

IMAGE="${ZIMAGE_IMAGE:-zimage:local}"
DATA="${ZIMAGE_HOME:-$HOME/.local/share/zimage}"

if ! command -v podman >/dev/null 2>&1; then
  echo "ERROR: podman not found on PATH." >&2
  exit 1
fi
if ! podman image exists "$IMAGE"; then
  echo "ERROR: image $IMAGE not built. Run shell-script/zimage-up first." >&2
  exit 1
fi

mkdir -p "$DATA/models" "$DATA/cache"

podman run --rm -i \
  -v "$DATA/models:/models:z" \
  -v "$DATA/cache:/root/.cache:z" \
  "$IMAGE" python - <<'PY'
import os
import shutil
import sys

from huggingface_hub import hf_hub_download

# (repo_id, repo-relative filename, models subdir, flat destination name).
# The destination names are exactly the filename constants the model registry
# (module/zimage-models) references — keep the two in sync. Every model is an fp8
# quant sized to the 16 GB card (never a BF16 AIO build), and loads through stock
# ComfyUI CORE loaders, which a GGUF quant would not. The per-eval LoRA is
# NOT downloaded here — it is supplied as a checkpoint argument per evaluation —
# but its loras/ subdir is created below so the loader sees it.
#
#   z-image-base  the fp8_e4m3fn scaled Tongyi-MAI Z-Image DiT — the undistilled
#                 model, sampled with real CFG; same Lumina2 arch as turbo, so it
#                 reuses the Qwen-3-4B fp8 text encoder and the Z-Image VAE below.
#   z-image-turbo standard Tongyi-MAI Z-Image-Turbo fp8_e4m3fn DiT (drbaph quant;
#                 the Comfy-Org repackage has no fp8) — a Lumina2 arch loading the
#                 Qwen-3-4B fp8 text encoder and the Z-Image VAE below.
FILES = [
    (
        "drbaph/Z-Image-fp8",
        "qwen_3_4b_fp8_mixed.safetensors",
        "text_encoders",
        "qwen_3_4b_fp8_mixed.safetensors",
    ),
    (
        "Comfy-Org/z_image_turbo",
        "split_files/vae/ae.safetensors",
        "vae",
        "ae.safetensors",
    ),
    (
        "drbaph/Z-Image-fp8",
        "z-img_fp8-e4m3fn-scaled.safetensors",
        "diffusion_models",
        "z-img_fp8-e4m3fn-scaled.safetensors",
    ),
    (
        "drbaph/Z-Image-Turbo-FP8",
        "z_image_turbo_fp8_e4m3fn.safetensors",
        "diffusion_models",
        "z-img-turbo_fp8-e4m3fn.safetensors",
    ),
]

# The per-eval LoRA lands here as a checkpoint argument, not a provision download.
os.makedirs("/models/loras", exist_ok=True)

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
