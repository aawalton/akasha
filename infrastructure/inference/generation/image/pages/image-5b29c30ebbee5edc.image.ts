import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5b29c30ebbee5edc = {
  id: "019f5886-d393-7332-a5f0-4b381d0e00ef",
  type: "page-type/image",
  slug: "image-5b29c30ebbee5edc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman with a trompe-l'oeil painted-on illusion of a delicate dress in body paint, artful fashion editorial, studio light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1425976517,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
