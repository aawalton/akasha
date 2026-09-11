import type { InferenceService } from "akasha/services/inference-services/inference-service.page-type.types.ts"

export const csm = {
  id: "01a090a2-71a8-79b2-a532-b27c27e05122",
  pageTypeSlug: "inference-service",
  type: "inference-service",
  slug: "csm",
  definition: "the Sesame CSM voice model, served by mlx-audio",
  host: "macbook",
  provision: "mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18084"],
  enabled: true,
  port: 8084,
  internalPort: 18084,
  lifecycle: "pool",
} as const satisfies InferenceService
