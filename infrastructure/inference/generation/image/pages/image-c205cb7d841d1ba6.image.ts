import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC205cb7d841d1ba6 = {
  id: "01a0c5f3-2542-71f2-9a5e-dca6ad83a28c",
  type: "page-type/image",
  slug: "image-c205cb7d841d1ba6",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, face in three-quarter view turned toward the camera, direct warm eye contact, soft smile, shoulder-length wavy blonde lob, soft rounded face with light freckles, blue eyes, fair skin, sage-green linen shirt, 85mm, shallow depth of field, photorealistic",
  seed: 1509567115,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
