import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9acb92d43d8ed63b = {
  id: "01a0c5f3-9f6f-7635-9430-ad3a2c1b864b",
  type: "page-type/image",
  slug: "image-9acb92d43d8ed63b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a striped top and denim shorts sitting on the harbor wall of Vernazza, Cinque Terre, colorful boats and stacked houses, late sun, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1779014709,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
