import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4db86577de3486d4 = {
  id: "019f588a-da83-75dc-96af-ebdd0275b20f",
  type: "page-type/image",
  slug: "image-4db86577de3486d4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman seated behind a cello, the instrument's body covering her torso, bow in hand, warm concert-hall light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1627065127,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
