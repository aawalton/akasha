import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEb71bc82a27f5441 = {
  id: "01a0c5f3-b3c9-731f-b5ff-e11985efbf66",
  type: "page-type/image",
  slug: "image-eb71bc82a27f5441",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman wading waist-deep into a still lake at dawn, mist on the water, back to camera, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1177948010,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
