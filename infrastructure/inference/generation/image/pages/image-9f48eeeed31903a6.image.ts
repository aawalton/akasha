import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9f48eeeed31903a6 = {
  id: "01a0c5f3-7a9b-7d37-ae90-c497777a9df0",
  type: "page-type/image",
  slug: "image-9f48eeeed31903a6",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on a Monaco suite bed wearing only a long strand of pearls between her bare breasts, propped on one elbow, opulent low light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 155489323,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
