import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image306ce4d55a6bf403 = {
  id: "01a0c5f3-b3c9-7037-a980-dc6ba748ebd0",
  type: "page-type/image",
  slug: "image-306ce4d55a6bf403",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Elegant woman in a Kyoto ryokan room at night, kneeling on tatami in a loosely tied indigo yukata that has slipped off one shoulder, pouring tea, glancing up to meet the camera, paper lantern and shoji screens, low warm light and deep shadow, quiet intimate travel photography\n",
  seed: 969563789,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
