import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBf4c4109439f936d = {
  id: "01a0c5f3-b3c7-70dc-9c60-2912100fecb3",
  type: "page-type/image",
  slug: "image-bf4c4109439f936d",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman arching her back on the bed with eyes closed, sensual morning stretch, golden light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1975504689,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
