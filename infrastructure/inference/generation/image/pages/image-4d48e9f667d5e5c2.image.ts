import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4d48e9f667d5e5c2 = {
  id: "01a0c5f2-eb21-7fd2-b370-ddb95628268d",
  type: "page-type/image",
  slug: "image-4d48e9f667d5e5c2",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman standing at the shore of a turquoise mountain lake, casual outdoor wear, dramatic peaks behind, crisp bright light, awed serene expression, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
