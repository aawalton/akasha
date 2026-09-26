import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA1a541676b3be452 = {
  id: "01a0c5f2-eb23-7877-a54a-85f84a689156",
  type: "page-type/image",
  slug: "image-a1a541676b3be452",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a swashbuckling pirate captain, tricorn hat, ornate coat and corset, ship deck at dusk, bold playful grin, warm golden light, 35mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
