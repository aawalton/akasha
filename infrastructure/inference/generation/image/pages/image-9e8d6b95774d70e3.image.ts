import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e8d6b95774d70e3 = {
  id: "01a0c5f3-8d0f-7582-8cea-54d795f97e0e",
  type: "page-type/image",
  slug: "image-9e8d6b95774d70e3",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties in an American motel room at night in 1987, cropped white ribbed tank and high-cut briefs, tanned legs, long sun-bleached hair, lying back across the bed propped on her elbows, looking straight down the lens with a knowing smile, pink and blue neon sign light slicing through venetian blinds, painterly realism, retro and hot\n",
  seed: 1743254565,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
