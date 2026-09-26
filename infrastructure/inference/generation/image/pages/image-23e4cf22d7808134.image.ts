import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image23e4cf22d7808134 = {
  id: "01a0c5f3-8d0b-752e-b136-f488f0cf4b50",
  type: "page-type/image",
  slug: "image-23e4cf22d7808134",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm olive skin, dark wavy hair, soft brown eyes meeting the camera with quiet tenderness, leaning very close in soft warm candlelight, a loosely draped sheer wrap that suggests rather than reveals, gentle inviting expression, bare shoulder, shallow depth of field, close intimate framing, hands resting softly, safe and warm sensual mood, natural skin texture, photographic, 50mm",
  seed: 538471,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
