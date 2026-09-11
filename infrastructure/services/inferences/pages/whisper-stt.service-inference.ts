import type { ServiceInference } from "akasha/infrastructure/services/inferences/service-inference.page-type.types.ts"

export const whisperStt = {
  id: "01a090a2-876d-7ca6-b85d-4fd1d602345f",
  pageTypeSlug: "service-inference",
  type: "service-inference",
  slug: "whisper-stt",
  definition: "the Whisper speech-to-text model, served by mlx-audio",
  host: "macbook",
  provision: "mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18085"],
  enabled: true,
  port: 8085,
  internalPort: 18085,
  lifecycle: "pool",
} as const satisfies ServiceInference
