import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9fd5daa1430836ed = {
  id: "01a0c5f3-8d0e-71be-af8e-37ba4761946e",
  type: "page-type/image",
  slug: "image-9fd5daa1430836ed",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art nude of a woman reclining like a classical painting, one arm overhead, soft north light, painterly, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1906528704,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
