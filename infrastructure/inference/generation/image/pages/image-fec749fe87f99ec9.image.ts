import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFec749fe87f99ec9 = {
  id: "01a0c5f2-eb1e-7c52-b464-844c8cbabdfb",
  type: "page-type/image",
  slug: "image-fec749fe87f99ec9",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sleek black leather midi skirt and blouse at a stylish evening venue, moody warm light, confident smile toward the viewer, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
