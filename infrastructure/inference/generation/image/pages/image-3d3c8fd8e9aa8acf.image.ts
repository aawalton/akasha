import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d3c8fd8e9aa8acf = {
  id: "01a0c5f3-b3ca-7e39-8ba8-a6321a7784d5",
  type: "page-type/image",
  slug: "image-3d3c8fd8e9aa8acf",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude professor woman holding a small chalkboard covered in equations across her front, wry smile, lecture-hall light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1618850134,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
