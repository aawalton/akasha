import type { ServiceInference } from "akasha/infrastructure/service/akasha-service/service-inference/service-inference.page-type.types.ts"

export const mossTts = {
  id: "01a090a1-e663-7f41-809c-ef0e35c0a233",
  type: "page-type/service-inference",
  slug: "moss-tts",
  definition: "the MOSS voice model, served by mlx-audio",
  host: "host/macbook",
  provision: "shell-script/mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18093"],
  enabled: true,
  port: 8093,
  internalPort: 18093,
  lifecycle: "service-lifecycle/pool",
  warm: true,
} as const satisfies ServiceInference
