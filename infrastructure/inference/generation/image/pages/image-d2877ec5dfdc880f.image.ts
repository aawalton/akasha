import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD2877ec5dfdc880f = {
  id: "01a0c5f2-eb24-7d4e-b436-436c26ed98e4",
  type: "page-type/image",
  slug: "image-d2877ec5dfdc880f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cooking at the stove, glancing back over her shoulder with a soft smile toward the viewer, steam rising from a pan, hair loosely tied, sleeves pushed up, warm kitchen light, 35mm, candid, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
