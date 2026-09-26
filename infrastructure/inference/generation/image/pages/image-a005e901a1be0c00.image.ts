import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA005e901a1be0c00 = {
  id: "01a0c5f3-9f6f-7f00-bed5-f12be3f39919",
  type: "page-type/image",
  slug: "image-a005e901a1be0c00",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art kneeling nude figure study, back arched gently, hands in lap, chiaroscuro lighting, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 943723721,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
