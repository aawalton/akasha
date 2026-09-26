import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2a81eb19eea44d99 = {
  id: "01a0c5f3-b3ca-70b6-8f20-044e031aee67",
  type: "page-type/image",
  slug: "image-2a81eb19eea44d99",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman with a red one-piece swimsuit rolled down to her waist, arm across her chest, poolside sun, wet skin, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1565549058,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
