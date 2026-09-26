import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2535c15649eef355 = {
  id: "01a0c5f3-9f6a-742a-a39a-7f7daac7a780",
  type: "page-type/image",
  slug: "image-2535c15649eef355",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic cinematic portrait of a striking young woman with a sleek jet-black bob, wearing a black leather jacket, standing on a neon-lit city street at night, moody colorful bokeh, confident slight smirk, 85mm, sharp detailed eyes, natural skin texture",
  seed: 1266203374,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
