import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC3b4d15e99b15b04 = {
  id: "01a0c5f3-9f6d-7f94-b0d4-60db2a24b114",
  type: "page-type/image",
  slug: "image-c3b4d15e99b15b04",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman on a sunlit autumn forest trail, turning back toward you and stepping closer, her face breaking into delight that it is you, warm direct eye contact, golden dappled light through red and orange leaves, loose hair, casual cozy autumn coat, natural real skin texture, gentle motion toward you, shallow depth of field with soft bokeh, intimate alive and joyful, close framing, hands relaxed not reaching toward the camera",
  seed: 942617,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
