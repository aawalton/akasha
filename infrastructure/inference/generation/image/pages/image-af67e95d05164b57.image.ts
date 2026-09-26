import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAf67e95d05164b57 = {
  id: "01a0c5f3-9f6c-7659-9c55-cb13fb0a4c3a",
  type: "page-type/image",
  slug: "image-af67e95d05164b57",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman behind a white lace parasol held low, Victorian-summer light, coy direct gaze, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 807404738,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
