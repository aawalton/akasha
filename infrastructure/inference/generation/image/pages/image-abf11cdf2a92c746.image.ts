import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAbf11cdf2a92c746 = {
  id: "01a0c5f3-7a9c-7fe9-9b69-ed0fe2a1ba67",
  type: "page-type/image",
  slug: "image-abf11cdf2a92c746",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with a length of fabric draped like a Greek statue over one shoulder and hip, marble-light studio, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 604163491,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
