import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3438de5650580dcb = {
  id: "01a0c5f3-8d10-7d09-9c42-f9a507ae2064",
  type: "page-type/image",
  slug: "image-3438de5650580dcb",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a satin robe slipping open to reveal her collarbone and thigh, loosely belted, warm lamp glow, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2131063088,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
