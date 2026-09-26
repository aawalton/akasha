import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7572797dd9cbb7df = {
  id: "01a0c5f3-b3c9-7f67-94c0-9fdb822c3686",
  type: "page-type/image",
  slug: "image-7572797dd9cbb7df",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art seated nude study, woman with knees drawn to one side, hands resting, sculptural soft light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1068403018,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
