import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a02a7a42c391576 = {
  id: "01a0c5f2-eb1f-7b17-a06a-c40e90e6a697",
  type: "page-type/image",
  slug: "image-8a02a7a42c391576",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a warrior yoga pose on a mat, fitted athletic top and leggings, calm centered expression, bright airy studio with soft natural light, 50mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
