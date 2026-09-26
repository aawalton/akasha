import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3efbff07f8756981 = {
  id: "01a0c5f3-9f6f-7597-adbc-63d86c459996",
  type: "page-type/image",
  slug: "image-3efbff07f8756981",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a light blue linen dress leaning on a whitewashed wall above the blue domes of Santorini, wind in her hair, Aegean glare softened by haze, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 883569554,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
