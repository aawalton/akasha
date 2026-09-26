import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image62c20d3ed58f7fd7 = {
  id: "019f5891-def4-7fbd-8ed4-037d9a7634a3",
  type: "page-type/image",
  slug: "image-62c20d3ed58f7fd7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a round hand mirror positioned to reflect and obscure, clever composition, boudoir light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1199304367,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
