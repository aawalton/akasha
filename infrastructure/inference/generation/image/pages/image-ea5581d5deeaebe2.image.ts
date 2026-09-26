import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEa5581d5deeaebe2 = {
  id: "01a0c5f2-eb21-71d5-b1b8-ebd6c442748b",
  type: "page-type/image",
  slug: "image-ea5581d5deeaebe2",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman outdoors in a soft pastel sundress walking a blooming garden path, dappled afternoon sunlight, gentle cheerful smile, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
