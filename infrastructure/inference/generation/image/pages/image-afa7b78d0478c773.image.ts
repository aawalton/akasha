import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAfa7b78d0478c773 = {
  id: "01a0c5f3-f000-7b5c-98ac-575a838af4f3",
  type: "page-type/image",
  slug: "image-afa7b78d0478c773",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "young human woman, tall, long raven-black hair, dark-rimmed rectangular glasses, faint ink smudges on her fingers, delicate gossamer butterfly wings shimmering violet and gold behind her, wearing a pretty sky-blue dress embroidered with white flowers, bright delighted smile mid-wave, chest-up portrait, sunlit library atrium behind her",
  seed: 4102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
