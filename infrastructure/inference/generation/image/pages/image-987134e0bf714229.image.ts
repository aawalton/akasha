import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image987134e0bf714229 = {
  id: "019f58a0-d654-79c9-9b06-4e2d39c1a2d0",
  type: "page-type/image",
  slug: "image-987134e0bf714229",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a large glowing paper lantern before her chest, warm light on her face, night garden, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 108438101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
