import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image758703f1b7040062 = {
  id: "01a0c5f3-b3c9-7e31-b148-bb75512f00ce",
  type: "page-type/image",
  slug: "image-758703f1b7040062",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman lying in bed with venetian-blind light striping across her skin, film-noir mood, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 584984866,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
