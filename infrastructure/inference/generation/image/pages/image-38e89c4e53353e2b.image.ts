import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image38e89c4e53353e2b = {
  id: "01a0c5f2-eb1f-7561-8a18-f0bdb8003334",
  type: "page-type/image",
  slug: "image-38e89c4e53353e2b",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a forest hiking trail glancing back with a bright happy smile, hiking gear and backpack, dappled sunlight, lush greenery, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
