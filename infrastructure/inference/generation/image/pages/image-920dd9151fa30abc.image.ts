import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image920dd9151fa30abc = {
  id: "01a0c5f3-9f6a-7422-bc1a-b9d0ab50b3a4",
  type: "page-type/image",
  slug: "image-920dd9151fa30abc",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a sheer white slip backlit on a Lisbon rooftop among laundry lines, body silhouetted through the fabric, terracotta rooftops at sunset, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 997609865,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
