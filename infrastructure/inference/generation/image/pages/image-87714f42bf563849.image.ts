import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image87714f42bf563849 = {
  id: "01a0c5f3-361f-7ac0-b380-0b797a6389a9",
  type: "page-type/image",
  slug: "image-87714f42bf563849",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting on a couch with her knees drawn up, arms loosely wrapped around them, head turned to look over at the camera beside her, direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, baggy white t-shirt and black yoga pants, warm golden hour light, 50mm, shallow depth of field, photorealistic",
  seed: 204,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
