import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a448db70083d4f7 = {
  id: "01a0c5f3-b3ca-7b09-9156-495f2e59438a",
  type: "page-type/image",
  slug: "image-1a448db70083d4f7",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in loose denim overalls with nothing underneath, one strap undone, bare sides and shoulders, sunlit barn, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 815415201,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
