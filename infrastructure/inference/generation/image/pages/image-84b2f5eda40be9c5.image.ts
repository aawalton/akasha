import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image84b2f5eda40be9c5 = {
  id: "019f5bb2-933b-7cec-bcce-77d8929dc1c6",
  type: "page-type/image",
  slug: "image-84b2f5eda40be9c5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude couple making love in a bed above the Amalfi coast, the woman astride him riding slowly, her back arched, breasts bare, her eyes on the camera, sea through the balcony, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1808098226,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
