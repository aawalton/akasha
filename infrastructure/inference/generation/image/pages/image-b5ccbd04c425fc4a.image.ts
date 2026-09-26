import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB5ccbd04c425fc4a = {
  id: "01a0c5f3-f003-71be-aafb-f97c96fa9ee8",
  type: "page-type/image",
  slug: "image-b5ccbd04c425fc4a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of two young Korean women in their mid-twenties with slim petite kpop-idol builds, standing in the rain, one holding the other from behind in a warm back-hug with arms wrapped around her waist, both with delighted laughing smiles, drenched, wet lingerie, lush green garden, soft overcast light, authentic candid snapshot",
  seed: 1175824307,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
