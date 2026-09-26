import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAa4bcb029f7b2576 = {
  id: "01a0c5f2-eb22-76db-9f92-807e4a1ab2bd",
  type: "page-type/image",
  slug: "image-aa4bcb029f7b2576",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose oversized tee, walking down a sunlit hallway glancing back with a soft smile, warm light, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
