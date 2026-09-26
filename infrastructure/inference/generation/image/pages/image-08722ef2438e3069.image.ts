import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image08722ef2438e3069 = {
  id: "01a0c5f3-9f6c-7dad-8b43-eb12d73cf9b0",
  type: "page-type/image",
  slug: "image-08722ef2438e3069",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman behind a laptop lid at a desk, glasses on, knowing look over the screen, home-office light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1661184577,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
