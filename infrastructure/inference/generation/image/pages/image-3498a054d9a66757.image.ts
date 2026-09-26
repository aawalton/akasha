import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3498a054d9a66757 = {
  id: "01a0c5f2-eb23-7e07-ba0b-079b559ae377",
  type: "page-type/image",
  slug: "image-3498a054d9a66757",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a woodland fairy, delicate iridescent wings, flower-adorned dress, glowing enchanted forest, gentle whimsical smile, soft magical light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
