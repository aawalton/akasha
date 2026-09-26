import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image83976e5a716063eb = {
  id: "01a0c5f3-b3ca-7e4f-ac82-5d85ea4ecc15",
  type: "page-type/image",
  slug: "image-83976e5a716063eb",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful feminine woman with soft curls wearing only a pinstripe waistcoat buttoned at the lowest button, tailor-shop light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1730391594,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
