import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image140302d0763b7543 = {
  id: "01a0c5f2-eb25-73cf-83a2-fc62d76ce473",
  type: "page-type/image",
  slug: "image-140302d0763b7543",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a lace bralette and panties sitting on a window seat, knees drawn up, soft daylight, serene relaxed gaze toward the viewer, 50mm, shallow depth of field, fine lace detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
