import type { InferenceService } from "akasha/services/inference-services/inference-service.page-type.types.ts"

export const voxcpm2 = {
  id: "01a090a2-b487-7840-b3dd-d4aec75b2e38",
  pageTypeSlug: "inference-service",
  type: "inference-service",
  slug: "voxcpm2",
  definition: "the VoxCPM2 voice model, served by mlx-audio",
  host: "macbook",
  provision: "mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18095"],
  enabled: true,
  port: 8095,
  internalPort: 18095,
  lifecycle: "pool",
} as const satisfies InferenceService
