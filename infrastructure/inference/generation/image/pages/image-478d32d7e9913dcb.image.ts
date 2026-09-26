import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image478d32d7e9913dcb = {
  id: "01a0c5f3-8d0c-7715-9256-8cb0519cb27a",
  type: "page-type/image",
  slug: "image-478d32d7e9913dcb",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding an empty ornate gilded picture frame around her face and chest, gallery light, living portrait, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 670224962,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
