import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image66162c6e0797c68b = {
  id: "01a0c5f3-b3ca-79bf-a100-3aedf1151741",
  type: "page-type/image",
  slug: "image-66162c6e0797c68b",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young east-asian woman with a specific memorable face, soft gentle quiet demeanor, dark hair, warm dark eyes meeting yours directly with soft delight and quiet affection, resting close in soft warm lamplight, simple soft top, natural real skin texture with subtle imperfections, deeply close warm and intimate, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 462085,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
