import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image59068ee2267fb1ff = {
  id: "01a0c5f3-9f6c-7d1a-9c68-4024bd7bfd3d",
  type: "page-type/image",
  slug: "image-59068ee2267fb1ff",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a cream crochet halter top, bare below, festival field at golden hour, flower in her hair, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2044074653,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
