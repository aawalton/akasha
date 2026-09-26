import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image08a512f42d3bf52a = {
  id: "01a0c5f2-eb1e-7178-916c-6eac5a95544f",
  type: "page-type/image",
  slug: "image-08a512f42d3bf52a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a chic black formal jumpsuit with a plunging neckline at a cocktail party, confident stylish posture, moody ambient light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
