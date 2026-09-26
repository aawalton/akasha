import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image82f0ab3978de084f = {
  id: "019f1838-5ad0-76d5-921d-ab1a7fa7ee02",
  type: "page-type/image",
  slug: "image-82f0ab3978de084f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A radiant woman with long auburn copper hair standing in a field of ripe golden summer wheat at golden hour, low warm sun backlighting her hair like fire, creamy white meadowsweet flowers frothing in the foreground, a low green hill in the soft-focus distance, she is turned slightly toward the viewer with a warm curious half-smile, summer evening light, painterly photographic, warm gold cream and meadow-green palette, cinematic, soft sunflare",
  seed: 565791476,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
