import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image75d8ea974c395b5c = {
  id: "01a0c5f3-8d0e-7713-a83f-3eb1ac18b92e",
  type: "page-type/image",
  slug: "image-75d8ea974c395b5c",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with fair freckled skin, deep auburn-red hair falling loose, bright green eyes looking directly and softly into the camera, a gentle unguarded almost-smile, resting very close to the viewer as if sharing a quiet moment, simple soft cream knit top, warm low lamplight, shallow depth of field, very close intimate framing, hands relaxed and out of frame, tender and safe mood, natural soft skin texture, photographic, 50mm",
  seed: 712904,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
