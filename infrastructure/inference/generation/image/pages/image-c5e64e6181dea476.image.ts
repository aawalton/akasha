import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC5e64e6181dea476 = {
  id: "019f2d59-1fdd-70d5-9ea1-539f49433578",
  type: "page-type/image",
  slug: "image-c5e64e6181dea476",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a young woman in her mid-twenties perched on a wooden stool in a night studio, leaning toward the viewer with forearms on her knee, moonlit canyon mist through the window, tangled dark hair spilling forward, warm weathered skin, grey-green eyes direct and amused, wearing only a sheer gauzy ivory robe with a clean straight deep V to the navel, nothing under the sheer, skin faint through the fabric, vintage headphones around her neck, lips parted",
  seed: 1064616979,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
