import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3a36678bca5c6b43 = {
  id: "01a0c5f2-eb1e-7ae1-a5e7-6494cc67d9a4",
  type: "page-type/image",
  slug: "image-3a36678bca5c6b43",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a beaded champagne gown raising a glass in a toast at an elegant dinner, warm candlelight, radiant joyful smile, 50mm, shallow depth of field, fine beaded detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
