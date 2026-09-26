import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3587c92701250801 = {
  id: "01a0c5f3-9f6c-757f-b587-701e059b1351",
  type: "page-type/image",
  slug: "image-3587c92701250801",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude artist woman holding a large wooden paint palette across her chest, paint smudges on her arms, studio light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1755276002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
