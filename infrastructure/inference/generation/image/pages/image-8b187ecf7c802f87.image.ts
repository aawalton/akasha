import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8b187ecf7c802f87 = {
  id: "01a0c5f3-8d0b-7288-9886-b3978b53cc5d",
  type: "page-type/image",
  slug: "image-8b187ecf7c802f87",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of a young woman with warm fair skin, auburn hair loose and soft, gentle hazel eyes meeting the camera with warm steady tenderness and a soft inviting almost-smile, lying very close on soft white bedding in warm golden light, draped loosely in a sheer translucent fabric that softly veils her bare body, soft curves suggested through the fabric, one arm relaxed, smooth skin in warm glow, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 805317,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
