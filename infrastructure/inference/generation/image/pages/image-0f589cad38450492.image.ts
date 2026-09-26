import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f589cad38450492 = {
  id: "01a0c5f3-f000-7554-87d2-66a1973aada5",
  type: "page-type/image",
  slug: "image-0f589cad38450492",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol figure, standing in heavy rain with arms outstretched and head tilted up, delighted open grin, wearing only a thin transparent white nightgown drenched and clinging to her, rain falling around her, moody overcast light, tropical greenery, spontaneous candid snapshot",
  seed: 1534218435,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
