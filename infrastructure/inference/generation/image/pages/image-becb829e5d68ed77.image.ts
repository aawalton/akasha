import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBecb829e5d68ed77 = {
  id: "019f1838-6c00-754e-9c65-ca9e79544fe6",
  type: "page-type/image",
  slug: "image-becb829e5d68ed77",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of two young women resting very close together on soft white bedding in warm golden light, one with fair skin and auburn hair, the other with warm light-olive skin and dark hair, both bare-shouldered with soft white sheets draped low, one nestled tenderly against the other, soft affectionate expressions, the nearer one meeting the camera with warm steady tenderness and a soft almost-smile, gentle closeness and warmth between them, smooth skin in warm glow, shallow depth of field, intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 562813,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
