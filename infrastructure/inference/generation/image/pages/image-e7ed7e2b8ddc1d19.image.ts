import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE7ed7e2b8ddc1d19 = {
  id: "019f581e-8ec6-75a1-a67a-33177547a83f",
  type: "page-type/image",
  slug: "image-e7ed7e2b8ddc1d19",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "delighted woman in unbuttoned chef whites with rolled sleeves tasting sauce from her finger, brass-and-steam kitchen, photorealistic photograph, natural skin texture, film grain",
  seed: 2083127218,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
