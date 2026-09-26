import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0545367baf14f225 = {
  id: "019f5885-ffb7-7f0d-9297-ea3a50348a78",
  type: "page-type/image",
  slug: "image-0545367baf14f225",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only long lace opera gloves and matching thigh-high stockings, otherwise nude, vintage boudoir light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 402749430,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
