import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image70b0ab5033bace3c = {
  id: "01a0c5f3-b3c8-75d1-b035-1661cadc97a3",
  type: "page-type/image",
  slug: "image-70b0ab5033bace3c",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid documentary-style photograph of a young woman at a cozy kitchen table in soft diffused morning window light, both hands warming around a mug of tea, glancing up naturally with a soft genuine relaxed smile as if you just walked in, eyes open and warm, unposed natural moment, not posing for the camera, warm intimate domestic atmosphere, soft casual clothing, candid alive and present, shallow depth of field",
  seed: 1991219013,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
