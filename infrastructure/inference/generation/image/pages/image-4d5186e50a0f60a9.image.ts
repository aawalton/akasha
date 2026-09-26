import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4d5186e50a0f60a9 = {
  id: "01a0c5f3-f001-7350-838f-dbf22aa8b59a",
  type: "page-type/image",
  slug: "image-4d5186e50a0f60a9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "young human woman, tall, long raven-black hair, dark-rimmed rectangular glasses, faint ink smudges on her fingers, delicate gossamer butterfly wings growing from her back, alive and shimmering violet and gold, both wings framing her, bright joyful smile as if greeting a dear friend, head-and-shoulders portrait, enchanted library: an open book floating beside her wreathed in golden mana with violet sparks, books drifting off warm-lit shelves behind her, golden dust motes",
  seed: 4107,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
