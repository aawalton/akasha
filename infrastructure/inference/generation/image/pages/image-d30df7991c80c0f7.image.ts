import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD30df7991c80c0f7 = {
  id: "01a0c5f3-9f6b-7aab-9fee-19d060818daf",
  type: "page-type/image",
  slug: "image-d30df7991c80c0f7",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman adorned only with a delicate draping gold body chain across her torso, jewelry as the only covering, warm glow, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2012504950,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
