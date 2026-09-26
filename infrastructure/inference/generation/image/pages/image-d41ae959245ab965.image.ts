import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD41ae959245ab965 = {
  id: "01a0c5f3-8d0b-7a73-b230-43f1ee641ce0",
  type: "page-type/image",
  slug: "image-d41ae959245ab965",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with soft fair skin and gentle East-Asian features, dark hair in a loose low style, soft dark eyes meeting the camera with quiet steady tenderness, a gentle calm almost-smile, resting close by a bright window in soft cool overcast daylight, airy white and pale-blue palette, simple soft white linen top, shallow depth of field, very close intimate framing, hands relaxed out of frame, calm quiet gentle safe mood, natural soft skin texture, photographic, 50mm",
  seed: 159847,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
