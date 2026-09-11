import type { ServiceInference } from "akasha/infrastructure/services/inferences/service-inference.page-type.types.ts"

export const mlxVlm = {
  id: "01a090a3-1740-747a-a45e-2af1a1123204",
  pageTypeSlug: "service-inference",
  type: "service-inference",
  slug: "mlx-vlm",
  definition: "the Qwen3-VL model that reads a picture, served by mlx-vlm",
  host: "macbook",
  provision: "mlx-vlm-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: [
    "python -m mlx_vlm.server --model mlx-community/Qwen3-VL-30B-A3B-Instruct-4bit --host 127.0.0.1 --port 18096",
  ],
  enabled: true,
  port: 8096,
  internalPort: 18096,
  lifecycle: "pool",
} as const satisfies ServiceInference
