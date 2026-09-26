import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA39afde615963cb2 = {
  id: "01a0c5f3-b3cc-79e5-944f-35ee297e6ac5",
  type: "page-type/image",
  slug: "image-a39afde615963cb2",
  grade: "S-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate fantasy portrait of an ethereal fire enchantress with warm sun-kissed skin glowing in firelight, long copper-red hair drifting as if on a warm updraft, bright amber eyes meeting the camera with warm steady tenderness and a soft inviting almost-smile, delicate glowing ember-runes tracing her bare shoulders and arms, reclining close amid warm hearthfire light with soft drifting golden embers and sparks, draped loosely in flowing translucent amber silk, bare shoulders, warm magical otherworldly glow, shallow depth of field, very close intimate framing, tender sensual magical safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 627401,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
