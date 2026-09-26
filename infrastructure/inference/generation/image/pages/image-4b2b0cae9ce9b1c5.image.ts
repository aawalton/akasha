import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b2b0cae9ce9b1c5 = {
  id: "01a0c5f3-9f6c-7188-bacb-950e8b73c5a4",
  type: "page-type/image",
  slug: "image-4b2b0cae9ce9b1c5",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a vintage faded rock band t-shirt slipping off one shoulder, bare legs, record-store morning, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 950335421,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
