import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3988493b8bb72f45 = {
  id: "01a0c5f3-8d0b-7ee4-b3b8-c10b1ae0cf7c",
  type: "page-type/image",
  slug: "image-3988493b8bb72f45",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm olive Mediterranean skin, dark glossy hair loose, striking expressive green eyes meeting the camera with warm steady tenderness, soft dark brows, a gentle genuine almost-smile, resting close in soft warm afternoon light, simple soft terracotta top, shallow depth of field, very close intimate framing, hands relaxed out of frame, warm safe gentle mood, natural soft skin texture, photographic, 50mm",
  seed: 318572,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
