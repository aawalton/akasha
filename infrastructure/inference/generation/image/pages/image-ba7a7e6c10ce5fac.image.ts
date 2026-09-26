import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBa7a7e6c10ce5fac = {
  id: "01a0c5f2-eb23-728c-898b-77054be2f8cc",
  type: "page-type/image",
  slug: "image-ba7a7e6c10ce5fac",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a cyberpunk netrunner, neon-trimmed jacket, glowing cybernetic accents, rain-soaked neon city street, confident smirk, 35mm, cinematic neon light, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
