import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7395786d5bb64bd8 = {
  id: "019f2d5b-bb4a-7dbc-aa80-5a6d24181897",
  type: "page-type/image",
  slug: "image-7395786d5bb64bd8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties in a night studio, adjusting one earcup of her brass headphones with two fingers, other ear free, head tilted listening, grey-green eyes on the viewer with quiet amusement, moonlit gorge and mist through the glass, wind-tangled dark brown hair, sun-weathered skin, wearing only a sheer whisper-thin ivory gown, straight fall, clean deep V open to her navel, nothing beneath the gauze, warm lamplight",
  seed: 326394800,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
