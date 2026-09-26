import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3415480745d963c9 = {
  id: "01a0c5f3-8d0b-7476-98ad-371c26171478",
  type: "page-type/image",
  slug: "image-3415480745d963c9",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of a young woman with warm fair skin, dark hair swept over one shoulder, seen from behind so her bare back and shoulders are toward the viewer, turning her head to glance back over her shoulder at the camera with warm steady tenderness and a soft inviting almost-smile, soft white sheet draped low at her lower back, warm golden light, smooth bare back, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 384650,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
