import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2254f6889009cf31 = {
  id: "01a0c5f3-b3c9-7856-8e22-4dc1fb2139dc",
  type: "page-type/image",
  slug: "image-2254f6889009cf31",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman lying alone across a big rumpled bed, reaching into the empty space, tender melancholy, dawn light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1885688609,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
