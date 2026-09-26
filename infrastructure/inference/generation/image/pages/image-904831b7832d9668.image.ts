import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image904831b7832d9668 = {
  id: "01a0c5f3-9f6e-75fd-9684-96cbc00301c9",
  type: "page-type/image",
  slug: "image-904831b7832d9668",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol figure, standing under a rainfall showerhead with her head tilted up into the water, delighted open grin, drenched, wet lingerie, steam, warm bathroom light, spontaneous candid snapshot",
  seed: 2082683925,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
