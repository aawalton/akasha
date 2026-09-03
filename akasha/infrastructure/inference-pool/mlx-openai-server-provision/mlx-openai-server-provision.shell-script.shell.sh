#!/bin/bash
set -euo pipefail

NAME="$1"
PYVER="$2"
CONDA_SH="$4"

ENV="inference-${NAME}"
MLX_OPENAI_SERVER_VERSION="1.8.1"
MLX_VERSION="0.31.0"

# shellcheck disable=SC1090
source "$CONDA_SH"

if conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  ENV_PREFIX="$(conda info --base)/envs/${ENV}"
  if ! "$ENV_PREFIX/bin/python" - "$ENV_PREFIX" <<'HEALTHEOF' >/dev/null 2>&1
import sys, os, glob
root = sys.argv[1]
spg = glob.glob(os.path.join(root, "lib", "python*", "site-packages"))
ok = bool(spg)
if spg:
    sp = spg[0]
    seen = {"mlx": False, "mlx_metal": False}
    for key, pat in (("mlx", "mlx-*.dist-info"), ("mlx_metal", "mlx_metal-*.dist-info")):
        for d in glob.glob(os.path.join(sp, pat)):
            seen[key] = True
            rec = os.path.join(d, "RECORD")
            if not os.path.isfile(rec):
                ok = False
                continue
            with open(rec, encoding="utf-8") as fh:
                for line in fh:
                    p = line.split(",")[0].strip()
                    if not p or p.endswith(".pyc"):
                        continue
                    if not os.path.exists(os.path.normpath(os.path.join(sp, p))):
                        ok = False
                        break
    ok = ok and seen["mlx"] and seen["mlx_metal"]
sys.exit(0 if ok else 1)
HEALTHEOF
  then
    echo "[${NAME}] corrupt mlx env detected (incomplete mlx/mlx-metal install) — removing for clean rebuild"
    conda env remove -n "$ENV" -y
  fi
fi

echo "[${NAME}] conda env ${ENV} (python ${PYVER})"
if ! conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  conda create -n "$ENV" -y "python=${PYVER}"
fi
conda activate "$ENV"

python -m pip install --upgrade pip
echo "[${NAME}] mlx-openai-server ${MLX_OPENAI_SERVER_VERSION} (mflux backend)"
python -m pip install "mlx-openai-server==${MLX_OPENAI_SERVER_VERSION}"
echo "[${NAME}] pin mlx==${MLX_VERSION} (mlx 0.31.2 thread-stream regression)"
python -m pip install --force-reinstall --no-deps "mlx==${MLX_VERSION}" "mlx-metal==${MLX_VERSION}"

echo "[${NAME}] relax ImageGenerationRequest.size enum -> free WxH"
python - <<'PYEOF'
import importlib.metadata as md
import os

base = str(md.distribution("mlx-openai-server").locate_file("app"))
openai_py = os.path.join(base, "schemas", "openai.py")
mflux_py = os.path.join(base, "handler", "mflux.py")


def patch(path, old, new, sentinel):
    rel = os.path.relpath(path, base)
    with open(path, encoding="utf-8") as f:
        src = f.read()
    if sentinel in src:
        print(f"  already patched app/{rel}")
        return
    if old not in src:
        raise SystemExit(f"patch target not found in app/{rel}: {old!r}")
    with open(path, "w", encoding="utf-8") as f:
        f.write(src.replace(old, new, 1))
    print(f"  patched app/{rel}")


patch(
    openai_py,
    'size: ImageSize | None = Field(\n'
    '        default=ImageSize.LARGE, description="The size of the generated images"\n'
    "    )",
    'size: str | None = Field(\n'
    '        default="1024x1024",\n'
    '        pattern=r"^[1-9][0-9]*x[1-9][0-9]*$",\n'
    '        description="The size of the generated images",\n'
    "    )",
    "size: str | None = Field(",
)
patch(
    mflux_py,
    'width, height = map(int, size.value.split("x"))',
    'width, height = map(int, str(size).split("x"))',
    'str(size).split("x")',
)
PYEOF

echo "[${NAME}] register base Z-Image config-name z-image (cli allowlist + mflux registries)"
python - <<'PYEOF'
import importlib.metadata as md
import os

base = str(md.distribution("mlx-openai-server").locate_file("app"))
cli_py = os.path.join(base, "cli.py")
mflux_py = os.path.join(base, "models", "mflux.py")


def patch(path, old, new, sentinel):
    rel = os.path.relpath(path, base)
    with open(path, encoding="utf-8") as f:
        src = f.read()
    if sentinel in src:
        print(f"  already patched app/{rel}")
        return
    if old not in src:
        raise SystemExit(f"patch target not found in app/{rel}: {old!r}")
    with open(path, "w", encoding="utf-8") as f:
        f.write(src.replace(old, new, 1))
    print(f"  patched app/{rel}")


# (1) cli.py hardcoded allowlist tuple (validate_image_config_name's source)
patch(
    cli_py,
    '    "z-image-turbo",\n    "flux2-klein-4b",',
    '    "z-image-turbo",\n    "z-image",\n    "flux2-klein-4b",',
    '    "z-image",',
)
# ZImage backend class import, alongside the existing ZImageTurbo
patch(
    mflux_py,
    "from mflux.models.z_image.variants import ZImageTurbo",
    "from mflux.models.z_image.variants import ZImage, ZImageTurbo",
    "import ZImage, ZImageTurbo",
)
# (2) _CONFIG_REGISTRY: config-name -> ModelConfig factory
patch(
    mflux_py,
    '    "z-image-turbo": ("z-image-turbo", ModelConfig.z_image_turbo),\n',
    '    "z-image-turbo": ("z-image-turbo", ModelConfig.z_image_turbo),\n'
    '    "z-image": ("z-image", ModelConfig.z_image),\n',
    '"z-image": ("z-image", ModelConfig.z_image),',
)
# (3) _MODEL_REGISTRY: config-name -> (backend, wrapper, display)
patch(
    mflux_py,
    '    "z-image-turbo": (ZImageTurbo, BackedImageModel, "Z Image Turbo"),\n',
    '    "z-image-turbo": (ZImageTurbo, BackedImageModel, "Z Image Turbo"),\n'
    '    "z-image": (ZImage, BackedImageModel, "Z Image"),\n',
    '"z-image": (ZImage, BackedImageModel, "Z Image"),',
)
PYEOF

case "$NAME" in
image-gen)
  echo "[image-gen] pre-download Tongyi-MAI/Z-Image-Turbo (~12 GB, text-to-image)"
  python -c "from huggingface_hub import snapshot_download; snapshot_download('Tongyi-MAI/Z-Image-Turbo')"
  ;;
image-gen-base)
  echo "[image-gen-base] pre-download Tongyi-MAI/Z-Image (non-distilled base, text-to-image)"
  python -c "from huggingface_hub import snapshot_download; snapshot_download('Tongyi-MAI/Z-Image')"
  ;;
*)
  echo "[mlx-openai-server] unknown service name: ${NAME}" >&2
  exit 1
  ;;
esac

echo "[${NAME}] provisioning complete"
