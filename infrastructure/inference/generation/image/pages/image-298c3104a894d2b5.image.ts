import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image298c3104a894d2b5 = {
  id: "01a0c5f3-8d0d-74a1-9c74-fbb91cd9f9e0",
  type: "page-type/image",
  slug: "image-298c3104a894d2b5",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol figure, standing in heavy rain with her arms outstretched and head tilted up, delighted open grin, drenched, wet lingerie, rain falling around her, moody overcast light, tropical greenery, spontaneous candid snapshot",
  seed: 1104838441,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
