import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image803875ca8602c6fe = {
  id: "01a0c5f3-9f6c-72ec-8981-9da5965cf6af",
  type: "page-type/image",
  slug: "image-803875ca8602c6fe",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a white cotton tube top, bare below, knees together seated on a windowsill, soft daylight, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 994389933,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
