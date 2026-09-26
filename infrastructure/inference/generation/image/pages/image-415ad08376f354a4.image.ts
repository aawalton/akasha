import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image415ad08376f354a4 = {
  id: "01a0c5f3-b3ca-7be3-ab57-cb2b5cf38ef9",
  type: "page-type/image",
  slug: "image-415ad08376f354a4",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude farm woman leaning over a hay bale, straw hat tipped back, golden harvest light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 415597390,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
