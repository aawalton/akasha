import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2ee528e969ac254b = {
  id: "01a0c5f3-8d0c-7234-baa7-fdb142a43427",
  type: "page-type/image",
  slug: "image-2ee528e969ac254b",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman loosely draped in a strand of glowing warm fairy lights and a wisp of sheer fabric, magical night mood, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 834359506,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
