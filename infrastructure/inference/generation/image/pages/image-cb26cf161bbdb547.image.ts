import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCb26cf161bbdb547 = {
  id: "01a0c5f3-8d0b-7080-8911-8c37de11e820",
  type: "page-type/image",
  slug: "image-cb26cf161bbdb547",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of a young woman with warm light-tan skin, dark hair loose over the pillow, soft brown eyes meeting the camera with warm steady tenderness and a soft inviting almost-smile, lying very close on soft white bedding in warm golden light, nude with a soft white sheet draped low across her hips and one arm resting softly across her chest, bare shoulders back and the soft curve of her body, smooth skin in warm glow, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 940628,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
