import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBd603e0689821c2a = {
  id: "01a0c5f3-b3c7-7196-8f1e-ef7fb4353d3b",
  type: "page-type/image",
  slug: "image-bd603e0689821c2a",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "wickedly delighted woman in a black slip dress and wide-brimmed hat stirring a glowing cauldron, candlelit apothecary, photorealistic photograph, natural skin texture, film grain",
  seed: 118191053,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
