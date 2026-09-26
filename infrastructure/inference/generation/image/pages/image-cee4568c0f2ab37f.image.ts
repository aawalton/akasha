import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCee4568c0f2ab37f = {
  id: "01a0c5f3-361f-75fb-9007-47b1a0c73a7b",
  type: "page-type/image",
  slug: "image-cee4568c0f2ab37f",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window at home, golden hour light, nearly frontal pose with the slightest head turn, direct warm eye contact, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, charcoal racerback athletic tank with bare shoulders, 85mm, shallow depth of field, photorealistic",
  seed: 60288851,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
