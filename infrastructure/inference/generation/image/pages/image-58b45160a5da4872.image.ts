import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58b45160a5da4872 = {
  id: "01a0c5f3-f000-7eac-a7ac-ee310ab00b74",
  type: "page-type/image",
  slug: "image-58b45160a5da4872",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties with a slim petite kpop-idol figure, standing in the rain glancing back over her shoulder with a delighted smile, wearing only a sheer transparent white nightgown soaked and clinging to her wet skin, raindrops on her shoulders, soft natural light, lush green background, spontaneous candid snapshot",
  seed: 2072799802,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
