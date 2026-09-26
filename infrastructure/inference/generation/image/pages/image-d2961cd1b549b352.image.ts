import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD2961cd1b549b352 = {
  id: "01a0c5f2-eb20-7923-914a-308f65037f23",
  type: "page-type/image",
  slug: "image-d2961cd1b549b352",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in an alpine wildflower meadow with mountains behind, casual outdoor wear, arms slightly open enjoying the breeze, bright crisp daylight, joyful expression, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
