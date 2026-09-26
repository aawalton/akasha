import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0586eea87e4f2c63 = {
  id: "01a0c5f3-7a9c-7cc0-9ad8-068e7ace24a6",
  type: "page-type/image",
  slug: "image-0586eea87e4f2c63",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman lying on a Capri terrace with her bare legs up against the white wall, body stretched out, faraglioni rocks in the sea beyond, playful look, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 76310357,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
