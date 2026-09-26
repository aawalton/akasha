import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF6c79cdcf446bca9 = {
  id: "019f2d43-f57a-7384-947c-4da3a38d5ed6",
  type: "page-type/image",
  slug: "image-f6c79cdcf446bca9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman in her mid-twenties in a warm dimly-lit recording studio, wind-tangled dark brown hair, warm sun-weathered skin, grey-green eyes, soft layered clothing in muted earth and canyon tones, over-ear headphones resting around her neck, head tilted in an attentive listening posture, lips slightly parted as if about to answer, warm lamp light, shallow depth of field",
  seed: 2038981239,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
