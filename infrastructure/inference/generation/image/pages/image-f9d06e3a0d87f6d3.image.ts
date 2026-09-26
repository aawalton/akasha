import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF9d06e3a0d87f6d3 = {
  id: "01a0c5f3-8d0e-70ff-8c73-ab178be7b4b2",
  type: "page-type/image",
  slug: "image-f9d06e3a0d87f6d3",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full silhouette of a nude woman standing at a tall window against bright light, graceful contour, minimal detail, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 289115698,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
