import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCdb95d256b8bab96 = {
  id: "01a0c5f2-eb24-793b-8503-29a2b8069c61",
  type: "page-type/image",
  slug: "image-cdb95d256b8bab96",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman nude in a warm shower, both hands lifted running through her wet hair, eyes closed in calm, water cascading down, steam in the air, soft warm bathroom light, natural anatomy, smooth realistic skin, sensual yet serene, 50mm, shallow depth of field, visible skin texture, photoreal",
  seed: 7,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
