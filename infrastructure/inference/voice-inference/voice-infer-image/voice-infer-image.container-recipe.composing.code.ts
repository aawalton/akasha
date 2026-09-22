import { dirname, relative } from "node:path"
import {
  besideOf,
  pageOf,
} from "akasha/infrastructure/container-image/modules/recipe-page/recipe-page.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const RECIPE = "container-recipe"

const OWN = "voice-infer-image"

const MODULE = "python-module"

const PYTHON = "python"

const SERVER = "voice-infer-server"

const MODELS = "voice-models"

function copying(given: string | Reading, slug: string, into: string): string {
  const context = dirname(dirname(pageOf(given, RECIPE, OWN).path))
  const from = relative(context, besideOf(pageOf(given, MODULE, slug), PYTHON))
  return `COPY ${from} ${into}`
}

export function bodyIn(given: string | Reading): string {
  const lines = [
    "# cu121 / Pascal (sm_61) voice-inference SERVING image — for the self-hosted",
    "# cluster's idle GTX 1080 Ti (node-02, 11 GB, Pascal sm_61, driver 535 = CUDA",
    "# 12.1 ceiling). Origin: #14660 (offload voice STT+TTS inference to the cluster",
    "# GPU, OpenAI-compatible contract, local fallback on non-200).",
    "#",
    "# WHY THIS BASE: driver 535 on node-02 caps CUDA at 12.1, so the stack pins the",
    "# cu121 wheel — torch 2.5.1+cu121 bundles sm_50..sm_90, covering the 1080 Ti's",
    "# Pascal sm_61 with no card-specific build. cu121 caps torch at 2.5.1 (newer",
    "# torch moved off cu121 wheels). The -devel tag carries nvcc for any node that",
    "# compiles; torch's own kernels are prebuilt in the wheel.",
    "#",
    "# Build: `akasha deploy voice-infer` asks the cluster's BuildKit for it and pushes",
    "# it to the in-cluster registry under the hash of what it was built from.",
    "FROM pytorch/pytorch:2.5.1-cuda12.1-cudnn9-devel",
    "",
    "ENV DEBIAN_FRONTEND=noninteractive",
    "# Pascal sm_61 is the target card. torch's own kernels are prebuilt in the cu121",
    "# wheel and ignore this — it only affects any nvcc source-compile.",
    'ENV TORCH_CUDA_ARCH_LIST="6.1"',
    "",
    "# The pytorch base is a conda env with torch 2.5.1+cu121 PREINSTALLED. Never",
    "# reinstall torch below — keep the base's proven 2.5.1+cu121 build.",
    "# espeak-ng is REQUIRED by Kokoro for phonemization; libsndfile1 for soundfile;",
    "# ffmpeg for audio decode.",
    "RUN apt-get update && apt-get install --no-install-recommends -y \\",
    "    git \\",
    "    wget \\",
    "    ffmpeg \\",
    "    libsndfile1 \\",
    "    espeak-ng \\",
    "    && apt-get clean \\",
    "    && rm -rf /var/lib/apt/lists/*",
    "",
    "# faster-whisper (STT), kokoro (TTS), soundfile (WAV IO), FastAPI + uvicorn (the",
    "# serving surface), python-multipart (multipart/form-data upload). torch is NOT",
    "# reinstalled — the base's proven 2.5.1+cu121 stays.",
    "RUN pip install --no-cache-dir \\",
    "    faster-whisper==1.1.0 \\",
    "    kokoro==0.9.4 \\",
    "    soundfile \\",
    "    fastapi \\",
    '    "uvicorn[standard]" \\',
    "    python-multipart",
    "",
    "# Build-time smoke: prove torch 2.5.1+cu121 imports and is the exact proven build.",
    "# The GPU-less BuildKit builder cannot import CUDA, so model-load validation is",
    "# deferred to RUNTIME in the GPU Job (where the card has a real driver).",
    "RUN python -c \"import torch; v=torch.__version__; print('torch', v); assert v.startswith('2.5.1+cu121'), v\"",
    "",
    "WORKDIR /app",
    "",
    "# Each module lands under the flat name its siblings import it by: server.py",
    "# imports voice_inference as a bare name, so copying a page's sidecar under",
    "# its own name would fail at import.",
    copying(given, SERVER, "/app/server.py"),
    copying(given, MODELS, "/app/voice_inference.py"),
    "",
    "ENV VOICE_INFER_PORT=8080",
    "",
    'CMD ["python", "/app/server.py"]',
  ]
  return `${lines.join("\n")}\n`
}
