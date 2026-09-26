import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image43a1679e25500e4f = {
  id: "019f1837-d413-79bc-ab46-78262919c992",
  type: "page-type/image",
  slug: "image-43a1679e25500e4f",
  persona: "persona/aelwyn",
  service: "image-edit-qwen",
  operation: "edit",
  model: "Qwen/Qwen-Image-Edit",
  prompt:
    "change her clothing to athletic leggings and a fitted sports top, and change the background to a modern indoor gym with exercise equipment, keep her face, hairstyle, and identity exactly the same, deep emerald green eyes, photorealistic",
  seed: 2097636016,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-d8452eca782f2a21",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
