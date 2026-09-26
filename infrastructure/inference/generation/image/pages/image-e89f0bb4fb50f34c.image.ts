import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE89f0bb4fb50f34c = {
  id: "01a0c5f3-8d0f-7be7-a6f2-1560a210999c",
  type: "page-type/image",
  slug: "image-e89f0bb4fb50f34c",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wrapped in a knitted blanket sliding off one shoulder, bare collarbone and hip, cozy fireplace glow, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1931213095,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
