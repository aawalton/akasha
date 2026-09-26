import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE0142517bcd57894 = {
  id: "01a0c5f3-7a9c-7066-85b8-130526b5be07",
  type: "page-type/image",
  slug: "image-e0142517bcd57894",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art standing nude in a contrapposto pose, weight on one hip, Renaissance-style soft light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1139621994,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
