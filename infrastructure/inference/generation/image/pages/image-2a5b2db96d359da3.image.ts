import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2a5b2db96d359da3 = {
  id: "01a0c5f3-9f6c-701b-9157-bd27660e8058",
  type: "page-type/image",
  slug: "image-2a5b2db96d359da3",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude surfer woman standing behind a surfboard planted upright in sand, arms resting on top, beach dawn, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1426766954,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
