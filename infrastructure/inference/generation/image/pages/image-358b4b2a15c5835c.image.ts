import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image358b4b2a15c5835c = {
  id: "01a0c5f3-7a9c-7a03-9f0e-ed5e9bc7e240",
  type: "page-type/image",
  slug: "image-358b4b2a15c5835c",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic bright portrait of an athletic young blonde woman with a high ponytail, wearing fitted activewear, outdoors on a sunny morning, mid-laugh full of energy, natural daylight, 85mm, healthy glowing skin, natural texture, shallow depth of field",
  seed: 1122482471,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
