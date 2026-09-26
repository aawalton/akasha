import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image81f4da17b7a3ea24 = {
  id: "01a0c5f3-8d10-77f9-8584-73b0a3921f12",
  type: "page-type/image",
  slug: "image-81f4da17b7a3ea24",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a laced corset seen from behind, bare shoulders, hands adjusting the laces, warm boudoir tone, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1407262456,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
