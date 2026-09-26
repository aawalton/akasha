import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6ac31e5ad0d71a33 = {
  id: "01a0c5f3-7a9b-7a40-921c-8f3b70137a63",
  type: "page-type/image",
  slug: "image-6ac31e5ad0d71a33",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman on gold silk sheets in a Roman apartment at golden hour, sprawled with abandon, bare breasts and thighs lit warm, lips parted, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 2113342626,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
