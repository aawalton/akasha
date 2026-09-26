import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b0fdb7a2e89f75b = {
  id: "01a0c5f3-9f6a-7473-9b18-d4f6d6bcb1e6",
  type: "page-type/image",
  slug: "image-9b0fdb7a2e89f75b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in only panties holding coffee at a sunlit window, soft belly, relaxed morning intimacy, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 240325097,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
