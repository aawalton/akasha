import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image786442fac5112b7b = {
  id: "01a0c5f3-b3c9-7efa-b6ec-657c1f3e9f2d",
  type: "page-type/image",
  slug: "image-786442fac5112b7b",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman resting at the edge of a moonlit pool, water lapping her waist, wet glistening skin, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 375123421,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
