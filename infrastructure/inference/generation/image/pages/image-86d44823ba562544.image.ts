import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86d44823ba562544 = {
  id: "01a0c5f3-8d0b-776f-8bda-2f8f22bf027e",
  type: "page-type/image",
  slug: "image-86d44823ba562544",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of two young women resting close together on soft white bedding in warm golden light, composed side by side with room in a square frame, one with fair skin and auburn hair, the other with warm light-olive skin and dark hair, both bare-shouldered with soft white sheets draped low, nestled tenderly together with soft affectionate expressions, both faces turned toward the camera with warm steady tenderness and soft almost-smiles, gentle closeness and warmth between them, smooth skin in warm glow, shallow depth of field, balanced intimate two-shot composition, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 562813,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
