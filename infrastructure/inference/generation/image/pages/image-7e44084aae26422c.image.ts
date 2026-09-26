import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e44084aae26422c = {
  id: "01a0c5f3-b3ca-734a-bbfc-c469b4a16f82",
  type: "page-type/image",
  slug: "image-7e44084aae26422c",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude scholar woman behind a large antique globe, fingers resting on it, library candlelight, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1846167070,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
