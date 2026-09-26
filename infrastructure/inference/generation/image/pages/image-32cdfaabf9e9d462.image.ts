import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image32cdfaabf9e9d462 = {
  id: "01a0c5f3-b3c9-722d-ba75-a39a294c9554",
  type: "page-type/image",
  slug: "image-32cdfaabf9e9d462",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Washington personified as a beautiful young woman in her early twenties — dark hair under a knit cap, forest-green rain jacket with pink rhododendron blossoms in hand, towering evergreen forest and snow-capped Mount Rainier behind her, cool misty pacific-northwest light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1032443214,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
