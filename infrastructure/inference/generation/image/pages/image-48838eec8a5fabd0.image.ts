import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48838eec8a5fabd0 = {
  id: "01a0c5f2-eb23-7ba6-8c86-759c9d2d4b6a",
  type: "page-type/image",
  slug: "image-48838eec8a5fabd0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a loose slouchy top and black tights, sitting on the floor stretching, relaxed warm smile, soft natural light through the window, 35mm, candid home moment, fine fabric texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
