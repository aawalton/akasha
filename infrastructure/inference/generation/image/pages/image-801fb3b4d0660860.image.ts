import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image801fb3b4d0660860 = {
  id: "01a0c5f3-3620-72a6-80ac-a5524f8f521d",
  type: "page-type/image",
  slug: "image-801fb3b4d0660860",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties resting her arms on the pool edge from in the water, chin near her hands, wet blonde hair slicked back, looking up at the camera with direct warm eye contact, soft playful smile, natural authentic beauty, soft features with subtle asymmetry, minimal makeup, real skin texture with water droplets, blue eyes, fair skin, sky-blue bikini, late afternoon light, 85mm, shallow depth of field, photorealistic",
  seed: 426,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
