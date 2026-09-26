import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d5d9ac09f504f60 = {
  id: "01a0c5f2-eb21-74d9-bfe5-5abee86f409e",
  type: "page-type/image",
  slug: "image-2d5d9ac09f504f60",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman outdoors in a white eyelet sundress on a sunny beach boardwalk, sea breeze in her hair, bright coastal light, joyful smile toward the viewer, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
