import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1517cf498d5c614e = {
  id: "01a0c5f3-361f-7af9-b1ef-6e900925c7e6",
  type: "page-type/image",
  slug: "image-1517cf498d5c614e",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, head turned just slightly off-axis in a subtle quarter view, nearly facing the camera, direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, cream off-the-shoulder sweater leaving both shoulders bare, 85mm, shallow depth of field, photorealistic",
  seed: 1853192906,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
