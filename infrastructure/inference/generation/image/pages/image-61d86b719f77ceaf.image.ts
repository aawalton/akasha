import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image61d86b719f77ceaf = {
  id: "01a0c5f2-eb25-716b-9874-7f083054a344",
  type: "page-type/image",
  slug: "image-61d86b719f77ceaf",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a short silk kimono robe falling open over delicate lingerie, sitting on the bed in the morning, soft warm light, tender relaxed expression, 50mm, shallow depth of field, fine fabric texture, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
