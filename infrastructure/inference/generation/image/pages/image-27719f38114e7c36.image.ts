import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image27719f38114e7c36 = {
  id: "01a0c5f3-3620-768e-b34c-b887a1e43fbe",
  type: "page-type/image",
  slug: "image-27719f38114e7c36",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties walking out of the ocean toward the camera, wet blonde hair slicked back and dripping, looking into the camera with direct warm eye contact, bright fresh smile, naturally pretty face with soft features and subtle asymmetry, light freckles, minimal makeup, real skin texture with water droplets, blue eyes, fair skin, sage-green bikini, golden hour backlight on the waves, 85mm, shallow depth of field, photorealistic",
  seed: 421,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
