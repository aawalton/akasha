import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDe635af5aacf62dc = {
  id: "01a0c5f4-03a3-7f00-bd65-17d2055dc0fc",
  type: "page-type/image",
  slug: "image-de635af5aacf62dc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of two young Korean women in their mid-twenties with slim petite kpop-idol figures in the rain, one holding the other from behind, both looking toward the camera with delighted laughing smiles, drenched, wet lingerie, rain, tropical garden, soft natural light, authentic candid snapshot",
  seed: 405966891,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
