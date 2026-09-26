import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF0a2c08792feb016 = {
  id: "019f5875-74a1-7740-bf2c-b204af1e3358",
  type: "page-type/image",
  slug: "image-f0a2c08792feb016",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "retro pin-up woman holding two large vinyl records over her chest, otherwise nude, playful wink, warm 70s tones, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 160832599,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
