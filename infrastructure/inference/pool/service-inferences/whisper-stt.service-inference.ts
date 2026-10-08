import type { ServiceInference } from "akasha/infrastructure/service/akasha-service/service-inference/service-inference.page-type.types.ts"

export const whisperStt = {
  id: "01a090a2-876d-7ca6-b85d-4fd1d602345f",
  type: "page-type/service-inference",
  slug: "whisper-stt",
  definition: "the Whisper speech-to-text model, served by mlx-audio",
  host: "host/macbook",
  provision: "shell-script/mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18085"],
  enabled: true,
  port: 8085,
  internalPort: 18085,
  lifecycle: "service-lifecycle/pool",
  createdAt: "2026-09-11T13:22:45.741Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceInference
