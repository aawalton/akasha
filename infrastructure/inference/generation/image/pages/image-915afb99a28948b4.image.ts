import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image915afb99a28948b4 = {
  id: "01a0c5f3-b3c7-7456-b06c-f27939847100",
  type: "page-type/image",
  slug: "image-915afb99a28948b4",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "enigmatic woman in a mirrored mini dress seated on a smoke-flooded floor, head tilted, laser-lit warehouse, photorealistic photograph, natural skin texture, film grain",
  seed: 1637679344,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
