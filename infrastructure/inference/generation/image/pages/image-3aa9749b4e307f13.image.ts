import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3aa9749b4e307f13 = {
  id: "01a0c5f3-9f6f-7d04-a2fa-26a8386f119c",
  type: "page-type/image",
  slug: "image-3aa9749b4e307f13",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an elegant summer dress trailing her fingers in the water from a gondola on a quiet Venetian canal, faded palazzi and soft lagoon light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1776865211,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
