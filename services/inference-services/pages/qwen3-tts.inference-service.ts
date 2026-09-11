import type { InferenceService } from "akasha/services/inference-services/inference-service.page-type.types.ts"

export const qwen3Tts = {
  id: "01a090a2-9e6d-7775-b13e-e20d48ca33a2",
  pageTypeSlug: "inference-service",
  type: "inference-service",
  slug: "qwen3-tts",
  definition: "the Qwen3 voice model, served by mlx-audio",
  host: "macbook",
  provision: "mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18092"],
  enabled: true,
  port: 8092,
  internalPort: 18092,
  lifecycle: "pool",
} as const satisfies InferenceService
