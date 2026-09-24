import type { ServiceInference } from "akasha/infrastructure/service/akasha-service/service-inference/service-inference.page-type.types.ts"

export const kokoro = {
  id: "01a090a2-5c24-724d-b01c-a733d03553e2",
  type: "page-type/service-inference",
  slug: "kokoro",
  definition: "the Kokoro voice model, served by mlx-audio",
  host: "host/macbook",
  provision: "shell-script/mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18083"],
  enabled: true,
  port: 8083,
  internalPort: 18083,
  lifecycle: "service-lifecycle/pool",
} as const satisfies ServiceInference
