import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e58b9fe7c745fed = {
  id: "01a0c5f2-eb23-794f-8d4b-f8a69e9afc21",
  type: "page-type/image",
  slug: "image-7e58b9fe7c745fed",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a warrior knight, polished steel plate armor, sword resting point-down, castle courtyard, noble determined expression, overcast daylight, 35mm, detailed armor, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
