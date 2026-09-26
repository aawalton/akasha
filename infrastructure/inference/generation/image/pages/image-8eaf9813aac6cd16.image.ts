import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8eaf9813aac6cd16 = {
  id: "01a0c5f3-b3ca-72a1-a073-7d7bd23397d3",
  type: "page-type/image",
  slug: "image-8eaf9813aac6cd16",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an unbuttoned red plaid flannel shirt with nothing beneath, bare legs, cabin porch morning, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 437093125,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
