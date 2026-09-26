import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF09fd1ae1ce9785d = {
  id: "01a0c5f3-9f6c-7718-a2ba-d058c4831e40",
  type: "page-type/image",
  slug: "image-f09fd1ae1ce9785d",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a long open knit duster cardigan with nothing beneath, one lapel held closed, rainy sunday window, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 207986657,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
