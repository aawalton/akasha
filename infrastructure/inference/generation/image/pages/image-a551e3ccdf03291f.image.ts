import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA551e3ccdf03291f = {
  id: "019f586b-7b7c-70bf-8955-51798ff14c29",
  type: "page-type/image",
  slug: "image-a551e3ccdf03291f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with a sheet of red silk sliding down across her body, motion caught, dramatic light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1042930733,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
