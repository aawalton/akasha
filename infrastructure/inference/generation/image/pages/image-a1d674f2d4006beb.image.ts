import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA1d674f2d4006beb = {
  id: "019f28d0-0654-7118-8403-f6bf9236faa4",
  type: "page-type/image",
  slug: "image-a1d674f2d4006beb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait photograph, head and shoulders, of a small sturdy young woman in her mid-twenties on mountain rock in soft early light, face nearly frontal. Black hair loosely gathered, escaped strands. Her irises are plain matte white like chalk or pale marble — completely non-luminous, catching only ordinary daylight, a hint of pupil beneath the white, softly unfocused. Grave calm beauty, serious, unhurried. Undyed linen wrap, bare shoulders, faint freckles. Natural skin texture, fine dust in the air, 85mm lens, photoreal.",
  seed: 6411,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
