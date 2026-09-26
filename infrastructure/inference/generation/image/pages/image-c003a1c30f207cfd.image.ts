import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC003a1c30f207cfd = {
  id: "019f58c4-8198-76c6-9766-3ae294073709",
  type: "page-type/image",
  slug: "image-c003a1c30f207cfd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude DJ woman crouched behind a turntable, headphones half on, vinyl light glow, sly look, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 959217562,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
