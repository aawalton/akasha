import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image30d522345ff5829b = {
  id: "01a0c5f3-b3cc-7bef-9d94-20c626a9eb75",
  type: "page-type/image",
  slug: "image-30d522345ff5829b",
  grade: "S-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate fantasy portrait of an ethereal elven woman with luminous fair skin, delicately pointed ears, flowing silver-blonde hair woven with tiny leaves, soft violet eyes meeting the camera with warm steady tenderness and a soft inviting almost-smile, faint glowing fae markings tracing her bare shoulders and collarbone, reclining close in a moonlit enchanted glade with soft bioluminescent flora and drifting motes of light, draped loosely in gossamer translucent silk, bare shoulders, ethereal otherworldly glow, shallow depth of field, very close intimate framing, tender sensual magical safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 318276,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
