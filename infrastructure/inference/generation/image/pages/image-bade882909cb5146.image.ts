import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBade882909cb5146 = {
  id: "01a0c5f4-03a4-7ac2-bc36-55768f58ebfd",
  type: "page-type/image",
  slug: "image-bade882909cb5146",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a fashion model in her late twenties standing waist-deep in a clear pool at the base of a waterfall, swimsuit, looking back over her shoulder, tropical greenery, warm golden light, fashion editorial 50mm photograph, visible skin texture",
  seed: 290890219,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
