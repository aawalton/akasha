import type { ServiceInference } from "akasha/infrastructure/services/inferences/service-inference.page-type.types.ts"

export const higgsAudio = {
  id: "01a090a2-4671-73bf-9c7f-1581d427b5b9",
  type: "service-inference",
  slug: "higgs-audio",
  definition: "the Higgs Audio voice model, served by mlx-audio",
  host: "macbook",
  provision: "mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18094"],
  enabled: true,
  port: 8094,
  internalPort: 18094,
  lifecycle: "pool",
} as const satisfies ServiceInference
