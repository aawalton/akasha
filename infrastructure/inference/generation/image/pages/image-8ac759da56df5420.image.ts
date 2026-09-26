import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8ac759da56df5420 = {
  id: "01a0c5f3-9f6a-7e8a-b353-512aede5727b",
  type: "page-type/image",
  slug: "image-8ac759da56df5420",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman by a window with faint neon light tracing her silhouette in blue and pink, night mood, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1032305825,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
