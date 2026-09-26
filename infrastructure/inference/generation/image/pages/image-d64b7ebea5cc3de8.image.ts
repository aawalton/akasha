import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD64b7ebea5cc3de8 = {
  id: "01a0c5f2-eb24-7410-89ef-629ff4814d5e",
  type: "page-type/image",
  slug: "image-d64b7ebea5cc3de8",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, sitting close together on a bed at night, wearing a soft flowing nightgown, intimate point of view as if seated on the bed facing her, close-up head-and-shoulders framing, warm bedside lamp glow, cozy dim bedroom, sheer-curtained window softly out of focus, gentle warm smile, close eye contact, 50mm, shallow depth of field, visible skin texture, soft golden warm lighting, photoreal, cinematic film still",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
