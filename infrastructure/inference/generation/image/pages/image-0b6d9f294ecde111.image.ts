import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0b6d9f294ecde111 = {
  id: "01a0c5f2-eb23-7e79-9e13-a19f8843735c",
  type: "page-type/image",
  slug: "image-0b6d9f294ecde111",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime onmyoji exorcist, flowing white-and-purple robes with talisman cards, glowing spirit wards, twilight shrine, calm mystical expression, soft glowing light, 50mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
