import type { InferenceService } from "akasha/services/inference-services/inference-service.page-type.types.ts"

export const mossTts = {
  id: "01a090a1-e663-7f41-809c-ef0e35c0a233",
  pageTypeSlug: "inference-service",
  type: "inference-service",
  slug: "moss-tts",
  definition: "the MOSS voice model, served by mlx-audio",
  host: "macbook",
  provision: "mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18093"],
  enabled: true,
  port: 8093,
  internalPort: 18093,
  lifecycle: "pool",
  warm: true,
} as const satisfies InferenceService
