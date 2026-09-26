import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3bf35771eb31056a = {
  id: "01a0c5f3-b3ca-74e2-bbd9-3754f18eef8d",
  type: "page-type/image",
  slug: "image-3bf35771eb31056a",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman covered artfully in white soap foam and bubbles, bare shoulders emerging, bright bathroom light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 579158449,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
