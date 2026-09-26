import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAd5bee91b67deffe = {
  id: "019f57e1-5531-75e6-87e7-477c1fa739c2",
  type: "page-type/image",
  slug: "image-ad5bee91b67deffe",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "carefree woman in a flowy yellow sundress standing on bicycle pedals coasting, head back laughing, cobblestone European street, summer morning, photorealistic photograph, natural skin texture, film grain",
  seed: 1043258013,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
