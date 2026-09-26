import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3370f9526a935b96 = {
  id: "01a0c5f3-b3ca-7581-a69c-374746fa9aa2",
  type: "page-type/image",
  slug: "image-3370f9526a935b96",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude sculptor woman at a pottery wheel, wet clay vase rising before her torso, smudged hands, studio light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 123914228,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
