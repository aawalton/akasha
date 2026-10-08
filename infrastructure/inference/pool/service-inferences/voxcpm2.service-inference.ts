import type { ServiceInference } from "akasha/infrastructure/service/akasha-service/service-inference/service-inference.page-type.types.ts"

export const voxcpm2 = {
  id: "01a090a2-b487-7840-b3dd-d4aec75b2e38",
  type: "page-type/service-inference",
  slug: "voxcpm2",
  definition: "the VoxCPM2 voice model, served by mlx-audio",
  host: "host/macbook",
  provision: "shell-script/mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18095"],
  enabled: true,
  port: 8095,
  internalPort: 18095,
  lifecycle: "service-lifecycle/pool",
  createdAt: "2026-09-11T13:22:57.287Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceInference
