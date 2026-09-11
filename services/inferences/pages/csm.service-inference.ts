import type { ServiceInference } from "akasha/services/inferences/service-inference.page-type.types.ts"

export const csm = {
  id: "01a090a2-71a8-79b2-a532-b27c27e05122",
  pageTypeSlug: "service-inference",
  type: "service-inference",
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
} as const satisfies ServiceInference
