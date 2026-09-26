import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image297044dc6017b4f9 = {
  id: "01a0c5f3-9f6c-7fd3-9b6a-ed0c570b33b1",
  type: "page-type/image",
  slug: "image-297044dc6017b4f9",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a classic beige trench coat worn open with nothing beneath, hands in pockets, rainy city street bokeh, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 157351778,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
