import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBd5de49a93743b9e = {
  id: "01a0c5f3-f000-7ef3-8a97-59d3c1655d2c",
  type: "page-type/image",
  slug: "image-bd5de49a93743b9e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties with a slim petite kpop-idol build, standing outdoors in pouring rain wearing only a sheer transparent white nightgown soaked and clinging to her wet skin, delighted laughing smile, rain streaming down, soft overcast natural light, lush green garden, authentic candid snapshot, natural skin texture",
  seed: 848638416,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
