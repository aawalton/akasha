import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4a6a53b4ba4e758f = {
  id: "01a0c5f3-361f-7026-acf1-2593a6fa0a3a",
  type: "page-type/image",
  slug: "image-4a6a53b4ba4e758f",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, face in three-quarter view turned toward the camera, direct warm eye contact, soft smile, long blonde waves swept over one shoulder, defined cheekbones and fuller lips, blue eyes, fair skin, white cotton oxford shirt with open collar, 85mm, shallow depth of field, photorealistic",
  seed: 1980137191,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
