import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image97e8abe27ba78b53 = {
  id: "019f57fe-2a5d-74dd-8998-3755553b6b8f",
  type: "page-type/image",
  slug: "image-97e8abe27ba78b53",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "winking 1950s pinup in a red polka-dot halter dress leaning over a jukebox, chrome-and-neon diner, photorealistic photograph, natural skin texture, film grain",
  seed: 577670444,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
