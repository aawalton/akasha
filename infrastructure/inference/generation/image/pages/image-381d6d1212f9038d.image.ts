import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image381d6d1212f9038d = {
  id: "01a0c5f3-b3ca-7031-9ccc-df3fa89c57d5",
  type: "page-type/image",
  slug: "image-381d6d1212f9038d",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful feminine woman with soft long hair wearing only black suspenders over her bare chest, high-waist trousers, workshop light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2102012055,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
