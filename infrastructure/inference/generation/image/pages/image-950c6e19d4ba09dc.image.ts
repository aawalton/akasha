import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image950c6e19d4ba09dc = {
  id: "01a0c5f3-b3ca-7309-a860-10776f9ed72c",
  type: "page-type/image",
  slug: "image-950c6e19d4ba09dc",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a soft cream knit poncho slipping off one bare shoulder, bare legs folded beneath her, otherwise nude, cozy studio window light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1212141440,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
