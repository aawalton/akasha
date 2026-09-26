import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCa9139ecc09aaedf = {
  id: "01a0c5f3-361f-72ba-84e3-3a8f72c8fefa",
  type: "page-type/image",
  slug: "image-ca9139ecc09aaedf",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photo of a woman in her early 30s sitting beside the viewer on a comfortable couch, turning her head to look over at the camera with direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, oversized baggy white t-shirt and black yoga pants, legs curled under her, golden hour window light across the living room, 50mm, shallow depth of field, photorealistic",
  seed: 201,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
