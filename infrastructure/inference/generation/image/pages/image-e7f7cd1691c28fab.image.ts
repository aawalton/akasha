import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE7f7cd1691c28fab = {
  id: "01a0c5f4-03a4-74fd-b979-513146750510",
  type: "page-type/image",
  slug: "image-e7f7cd1691c28fab",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young Norse woman, pale luminous skin lit faintly from within, dark honey-bronze hair loosely pinned up, warm amber-brown eyes, laughing softly as she lifts a finished bolt of woven cloth off a great loom, sleeves rolled, thread around her wrist. Warm lamplight in an ancient timber hall, evening, joy of completion on her face, photoreal, shallow depth of field, chest-up composition",
  seed: 4102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
