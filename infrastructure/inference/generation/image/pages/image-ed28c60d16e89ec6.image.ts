import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEd28c60d16e89ec6 = {
  id: "01a0c5f3-9f6b-7e13-b9d4-811744378d6a",
  type: "page-type/image",
  slug: "image-ed28c60d16e89ec6",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "glamorous woman in a white retro one-piece and cat-eye sunglasses lounging on a diving board, glancing over her glasses, palm springs pool, photorealistic photograph, natural skin texture, film grain",
  seed: 765190569,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
