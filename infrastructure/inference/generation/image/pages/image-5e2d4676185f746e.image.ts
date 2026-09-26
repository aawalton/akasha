import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5e2d4676185f746e = {
  id: "019f5b45-5561-7f1a-bdf6-2a64695d0260",
  type: "page-type/image",
  slug: "image-5e2d4676185f746e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "chic woman at a Parisian café terrace with an espresso and a croissant, striped top and red lipstick, rattan chairs and morning light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1456555781,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
