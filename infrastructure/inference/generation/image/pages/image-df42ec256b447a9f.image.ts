import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDf42ec256b447a9f = {
  id: "01a0c5f3-8d0e-710b-8076-ab7d7ce5f764",
  type: "page-type/image",
  slug: "image-df42ec256b447a9f",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman in an open-air island shower, water streaming over bare breasts and belly, head tipped back but eyes on the camera, whitewash and sun, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1199094562,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
