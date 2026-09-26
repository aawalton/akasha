import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image276ea545b5d5f1e9 = {
  id: "019f1839-0071-7f6e-896c-c65ad83573e2",
  type: "page-type/image",
  slug: "image-276ea545b5d5f1e9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic ethereal portrait of two young women, one with platinum-blonde hair and one with soft strawberry-blonde hair, pale luminous skin, soft pastel dawn light, dreamy romantic mood, delicate and serene, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80120011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
