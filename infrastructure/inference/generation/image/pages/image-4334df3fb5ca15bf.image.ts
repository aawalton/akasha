import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4334df3fb5ca15bf = {
  id: "01a0c5f2-eb24-7b5d-aed9-c26b5eaa27fd",
  type: "page-type/image",
  slug: "image-4334df3fb5ca15bf",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman nude in a warm shower, glancing softly over her shoulder toward the viewer, wet skin with water droplets, steam in the air, soft intimate bathroom light, natural anatomy, smooth realistic skin, graceful relaxed pose, 50mm, shallow depth of field, visible skin texture, photoreal",
  seed: 23,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
