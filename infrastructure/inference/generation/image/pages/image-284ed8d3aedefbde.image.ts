import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image284ed8d3aedefbde = {
  id: "01a0c5f3-9f6b-7ca9-bf45-04678734220f",
  type: "page-type/image",
  slug: "image-284ed8d3aedefbde",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "playful woman wearing only a linen kitchen apron tied at the neck and waist, bare back and sides, sunlit rustic kitchen, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1513662094,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
