import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image732873f36e185787 = {
  id: "01a0c5f3-f001-7692-9105-d771c3f579e2",
  type: "page-type/image",
  slug: "image-732873f36e185787",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photograph, young human woman, tall, long raven-black hair, dark-rimmed rectangular glasses, faint ink smudges on her fingers, delicate gossamer butterfly wings growing from her back, alive and shimmering violet and gold, looking directly into the camera with a warm delighted smile, head-and-shoulders portrait, enchanted library around her: floating books drifting between towering shelves, motes of golden light, soft wisps of golden mana with violet sparks curling around her raised fingertips",
  seed: 4108,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
