import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image68e308833395ba61 = {
  id: "01a0c5f3-9f6b-792a-bd61-707fb5d5fa7d",
  type: "page-type/image",
  slug: "image-68e308833395ba61",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman curled on a sunlit window seat, knees up, gazing outside, soft warm light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1991990563,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
