import type { ServiceInference } from "akasha/infrastructure/services/inferences/service-inference.page-type.types.ts"

export const imageGen = {
  id: "01a090a2-e6cb-721a-882d-350f1bbdcced",
  pageTypeSlug: "service-inference",
  type: "service-inference",
  slug: "image-gen",
  definition: "the Z-Image Turbo picture model, served by mlx-openai-server",
  host: "macbook",
  provision: "mlx-openai-server-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: [
    "mlx-openai-server launch --model-type image-generation --model-path Tongyi-MAI/Z-Image-Turbo --config-name z-image-turbo --quantize 8 --queue-timeout 1800 --host 127.0.0.1 --port 18086",
  ],
  enabled: true,
  port: 8086,
  internalPort: 18086,
  lifecycle: "pool",
  warm: true,
} as const satisfies ServiceInference
