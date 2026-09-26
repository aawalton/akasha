import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image766a00f0634338ad = {
  id: "01a0c5f3-b3c8-78fe-b4f4-c7be8a66a58d",
  type: "page-type/image",
  slug: "image-766a00f0634338ad",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a young dryad emerging from the trunk of a great oak, her lower body still fused into the living bark and roots, brown bark-textured skin transitioning to smooth flesh, arms branching into leafy limbs, hair of oak leaves, amber eyes, serene expression, dappled forest light, intricate detail, 35mm full length, photorealistic",
  seed: 811,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
