import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFddcfff27779c99f = {
  id: "01a0c5f3-9f6c-7240-aeb2-669b522857c0",
  type: "page-type/image",
  slug: "image-fddcfff27779c99f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a long sheer silk scarf looped around her neck and draping over her chest, otherwise bare, breezy light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 60391677,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
