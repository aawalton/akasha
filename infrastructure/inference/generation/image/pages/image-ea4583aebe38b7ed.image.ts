import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEa4583aebe38b7ed = {
  id: "01a0c5f2-eb1e-75c5-acdf-b1acf5adb859",
  type: "page-type/image",
  slug: "image-ea4583aebe38b7ed",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a floral wrap skirt and simple top in a lush garden, soft daylight, serene relaxed smile toward the viewer, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
