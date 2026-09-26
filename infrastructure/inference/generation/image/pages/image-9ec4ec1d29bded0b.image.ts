import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ec4ec1d29bded0b = {
  id: "01a0c5f2-eb23-76de-8ad1-5942b3d7a78c",
  type: "page-type/image",
  slug: "image-9ec4ec1d29bded0b",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a sci-fi starfighter pilot, flight suit with patches and helmet under arm, hangar bay with a spacecraft behind, confident grin, dramatic light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
