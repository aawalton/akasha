import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image35c0276e54fff93a = {
  id: "01a0c5f3-9f6c-70c2-b5de-bff267689f8c",
  type: "page-type/image",
  slug: "image-35c0276e54fff93a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman in tall grass holding a wicker picnic basket in front of her, sun hat, golden field light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 468575224,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
