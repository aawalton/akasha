import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA507334629156f80 = {
  id: "019f58b9-456f-7ad1-8c8b-c5422098dae8",
  type: "page-type/image",
  slug: "image-a507334629156f80",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding two towering ice cream cones over her chest, summer heat, melting drips, playful panic, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 498201653,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
