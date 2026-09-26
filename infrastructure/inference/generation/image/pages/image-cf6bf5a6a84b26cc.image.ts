import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCf6bf5a6a84b26cc = {
  id: "01a0c5f2-eb25-780d-ac93-424b89189286",
  type: "page-type/image",
  slug: "image-cf6bf5a6a84b26cc",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a satin slip curled in a reading nook with a book, soft afternoon light through the window, serene relaxed expression, 50mm, shallow depth of field, fine fabric sheen, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
