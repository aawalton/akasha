import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image96eccbdf37675a8b = {
  id: "019f5a52-d7d7-74e7-85c4-fab334bc280d",
  type: "page-type/image",
  slug: "image-96eccbdf37675a8b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an oversized unzipped grey hoodie with nothing beneath, hood up, bare legs, skater afternoon light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1690845404,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
