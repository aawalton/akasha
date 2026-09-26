import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8e124ea9b302099 = {
  id: "01a0c5f3-b3c9-782b-8238-3d483dcda736",
  type: "page-type/image",
  slug: "image-e8e124ea9b302099",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art crouched nude figure, compact sculptural pose, arms wrapped around knees, rim light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 31575713,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
