import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2968437d1d06a7b6 = {
  id: "01a0c5f3-8d0e-7306-aaf3-fd31625b4a05",
  type: "page-type/image",
  slug: "image-2968437d1d06a7b6",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a beautiful young woman with long soft wavy auburn hair, warm tender smile, delicate feminine features, wearing an off-shoulder soft knit top revealing bare shoulders and collarbone, soft golden window light, gentle warm direct gaze, 85mm, luminous natural skin texture, shallow depth of field",
  seed: 10987189,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
