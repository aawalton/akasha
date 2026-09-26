import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFe53738553a27aeb = {
  id: "01a0c5f3-9f6f-780d-87c8-4ef529167bb9",
  type: "page-type/image",
  slug: "image-fe53738553a27aeb",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art close torso study of a nude woman, soft light modeling the form, black background, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1219811547,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
