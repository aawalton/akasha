import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image66e4861abb0f8e6b = {
  id: "01a0c5f3-361f-72c6-813d-c1627011c483",
  type: "page-type/image",
  slug: "image-66e4861abb0f8e6b",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, face in three-quarter view turned toward the camera, direct warm eye contact, soft smile, loose low blonde braid draped over her shoulder, elegant narrow face, blue eyes, fair skin, heather-gray henley, 85mm, shallow depth of field, photorealistic",
  seed: 1099998242,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
