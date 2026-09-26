import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image33d13bca696b96ec = {
  id: "01a0c5f3-b3c7-7dc1-94d7-789916f91fae",
  type: "page-type/image",
  slug: "image-33d13bca696b96ec",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "bored beautiful woman in a slip dress over a band tee with flannel tied at her waist, sitting on an amp backstage, dressing-room bulb light, photorealistic photograph, natural skin texture, film grain",
  seed: 1069740901,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
