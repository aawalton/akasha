import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC2486f31750c2cb5 = {
  id: "01a0c5f3-efff-71d4-beaf-5a10460a4692",
  type: "page-type/image",
  slug: "image-c2486f31750c2cb5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "intimate close-up of a beautiful blonde woman's face in profile pressed against a man's neck and jaw, mouth open in a helpless gasp, eyes squeezed shut, cheeks flushed pink, loose golden hair tangled across both of them, her hand clutching his shoulder, warm flickering firelight, photorealistic, 85mm, shallow depth of field, visible skin texture, fine flyaway hairs",
  seed: 957726417,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
