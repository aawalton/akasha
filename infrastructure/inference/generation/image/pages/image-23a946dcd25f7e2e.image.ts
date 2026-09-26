import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image23a946dcd25f7e2e = {
  id: "01a0c5f3-b3ca-7dc5-ad97-9fdf1f471016",
  type: "page-type/image",
  slug: "image-23a946dcd25f7e2e",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful feminine woman with long dark hair wearing only an open tuxedo jacket and an undone bowtie around her neck, champagne party glow, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 978905063,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
