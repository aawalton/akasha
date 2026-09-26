import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD82a268ca2554114 = {
  id: "01a0c5f3-361f-77b6-8eb9-513170906e06",
  type: "page-type/image",
  slug: "image-d82a268ca2554114",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s by a tall window at home, golden hour light, nearly frontal pose with the slightest head turn, direct warm eye contact, relaxed post-workout glow, soft smile, long straight blonde hair with a side part, delicate features with high cheekbones, blue eyes, fair skin, sage ribbed sports bra under an unzipped cream hoodie, 85mm, shallow depth of field, photorealistic",
  seed: 1220635806,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
