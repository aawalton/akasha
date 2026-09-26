import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3f8c235072719708 = {
  id: "01a0c5f3-7a9c-7399-b240-c853976b1373",
  type: "page-type/image",
  slug: "image-3f8c235072719708",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman straddling a wooden chair backwards in a Barcelona loft, bare breasts against the chair back, smoldering direct gaze, warm night light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 2118649331,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
