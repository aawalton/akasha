import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image87e0142c80341f13 = {
  id: "01a0c5f3-f000-7180-885b-18847c205dbf",
  type: "page-type/image",
  slug: "image-87e0142c80341f13",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "young human woman, tall, long raven-black hair, dark-rimmed rectangular glasses, faint ink smudges on her fingers, delicate gossamer butterfly wings shimmering violet and gold behind her, hovering slightly above the floor between towering bookshelves, wings spread and glowing, golden mana sparks with violet arcs swirling around her hands, focused intent expression, chest-up portrait",
  seed: 4104,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
