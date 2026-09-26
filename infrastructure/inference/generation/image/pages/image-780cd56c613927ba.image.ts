import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image780cd56c613927ba = {
  id: "01a0c5f3-f000-7692-90d4-4c90e04ffa73",
  type: "page-type/image",
  slug: "image-780cd56c613927ba",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "young human woman, tall, long raven-black hair, dark-rimmed rectangular glasses, faint ink smudges on her fingers, delicate gossamer butterfly wings shimmering violet and gold behind her, seated at a reading table with a steaming teacup and open books, a tiny golden dragonet perched on her shoulder, soft candlelight, gentle contented expression, chest-up portrait",
  seed: 4103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
