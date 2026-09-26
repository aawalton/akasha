import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b37aaab2294496f = {
  id: "01a0c5f3-b3c8-73f8-816e-c52f80105f4b",
  type: "page-type/image",
  slug: "image-4b37aaab2294496f",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Montana personified as a beautiful young woman in her early twenties — dark braided hair under a felt western hat, shearling ranch coat, pink bitterroot flowers in hand, immense big-sky clouds over snow-tipped mountain ranges and golden rangeland behind her, vast clear frontier light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 603346027,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
