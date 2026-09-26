import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image990c3a82df5da5a8 = {
  id: "01a0c5f3-8d0e-76b0-8cf0-18f8fe28e4ac",
  type: "page-type/image",
  slug: "image-990c3a82df5da5a8",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with pale fair skin, soft ash-blonde hair loose over one shoulder, gentle grey-blue eyes meeting the camera with quiet tenderness, leaning very close in soft warm candlelight, a loosely draped soft knit wrap slipping off one shoulder suggesting rather than revealing, warm unguarded almost-smile, shallow depth of field, close intimate framing, hands resting softly out of frame, safe and warm tender mood, natural soft skin texture, photographic, 50mm",
  seed: 367015,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
