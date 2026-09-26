import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE81ca0bd0739a1ee = {
  id: "01a0c5f3-b3ca-7190-85d5-3b63b2b75768",
  type: "page-type/image",
  slug: "image-e81ca0bd0739a1ee",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only frayed denim cutoff shorts, one arm across her chest, tailgate of a pickup truck, summer dust light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1820474146,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
