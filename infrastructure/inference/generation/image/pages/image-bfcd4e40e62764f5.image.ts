import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBfcd4e40e62764f5 = {
  id: "01a0c5f3-9f6c-7c01-ac24-a7bdf41fe08f",
  type: "page-type/image",
  slug: "image-bfcd4e40e62764f5",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude archer woman with a leather quiver strap across her chest and a bow held vertical, forest dawn, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 520085132,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
