import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8289aac5dd383a53 = {
  id: "01a0c5f3-9f6c-7f1f-a47d-9480bc06e6f9",
  type: "page-type/image",
  slug: "image-8289aac5dd383a53",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a broadsheet newspaper open across her front, reading glasses, breakfast-table light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 980316588,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
