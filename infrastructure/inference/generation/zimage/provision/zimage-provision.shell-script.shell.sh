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
# (module/zimage-models) references — keep the two in sync. The checkpoint is an
# fp8 quant sized to the 16 GB card (never a BF16 AIO build), and loads through
# stock ComfyUI CORE loaders, which a GGUF quant would not. The per-eval LoRA is
# NOT downloaded here — it is supplied as a checkpoint argument per evaluation —
# but its loras/ subdir is created below so the loader sees it.
#
#   beyond-reality-3  the fp8 BEYOND REALITY SUPER Z IMAGE 3.0 DiT, a Z-Image-Turbo
#                     finetune — a Lumina2 arch loading the Qwen-3-4B fp8 text
#                     encoder and the Z-Image VAE below. The repo spells the file
#                     with a Chinese subtitle, so it is named here as the repo names
#                     it and lands under the flat name the registry references.
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
        "Nurburgring/BEYOND_REALITY_Z_IMAGE",
        "BEYOND REALITY SUPER Z IMAGE 3.0 浓妆淡抹总相宜 FP8.safetensors",
        "diffusion_models",
        "beyond-reality-3_fp8.safetensors",
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
