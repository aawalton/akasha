import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c05c480e1aa4556 = {
  id: "019f58ca-b4ca-7670-abf8-ec38d8616e4f",
  type: "page-type/image",
  slug: "image-1c05c480e1aa4556",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude highlander woman hugging tartan bagpipes across her front, misty moor light, spirited eyes, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1641030494,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
