import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD7e3a020dacef9fa = {
  id: "01a0c5f2-eb21-7749-ba69-ff2f501b23d6",
  type: "page-type/image",
  slug: "image-d7e3a020dacef9fa",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman exploring a colorful Marrakech market, casual light outfit, vibrant textiles and spices around her, warm golden light, curious delighted expression, 35mm, candid travel photo, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
