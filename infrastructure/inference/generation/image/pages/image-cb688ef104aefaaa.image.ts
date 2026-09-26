import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCb688ef104aefaaa = {
  id: "01a0c5f3-361f-7699-9c4b-5249319ae03d",
  type: "page-type/image",
  slug: "image-cb688ef104aefaaa",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "tight head-and-shoulders portrait of a woman in her early 30s by a tall window, late golden hour light glowing warm on her skin, head turned just slightly off-axis in a subtle quarter view, nearly facing the camera, direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, cream off-the-shoulder sweater leaving both shoulders bare, 105mm, shallow depth of field, photorealistic",
  seed: 106,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
