import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16e45e2f5b05a330 = {
  id: "01a0c5f3-9f6a-713f-a49e-b7dd6eaf0e99",
  type: "page-type/image",
  slug: "image-16e45e2f5b05a330",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman standing by a rain-streaked window, soft grey light, contemplative, water shadows on skin, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 74299797,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
