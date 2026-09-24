import type { ServiceInference } from "akasha/infrastructure/service/akasha-service/service-inference/service-inference.page-type.types.ts"

export const qwen3Tts = {
  id: "01a090a2-9e6d-7775-b13e-e20d48ca33a2",
  type: "page-type/service-inference",
  slug: "qwen3-tts",
  definition: "the Qwen3 voice model, served by mlx-audio",
  host: "host/macbook",
  provision: "shell-script/mlx-audio-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["python -m mlx_audio.server --host 127.0.0.1 --port 18092"],
  enabled: true,
  port: 8092,
  internalPort: 18092,
  lifecycle: "service-lifecycle/pool",
} as const satisfies ServiceInference
