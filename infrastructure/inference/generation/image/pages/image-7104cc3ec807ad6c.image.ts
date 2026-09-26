import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7104cc3ec807ad6c = {
  id: "019f58b2-2bf8-7da9-9fab-cf0d993aa49e",
  type: "page-type/image",
  slug: "image-7104cc3ec807ad6c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude carnival woman holding two giant pink cotton-candy clouds over her chest, fairground bokeh lights, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 690933460,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
