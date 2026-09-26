import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3161d03fc403ed93 = {
  id: "01a0c5f3-2542-7824-8271-82430a6e9595",
  type: "page-type/image",
  slug: "image-3161d03fc403ed93",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up portrait of a woman in her early 30s at a writing desk by a tall window, golden hour light, face in three-quarter view turned toward the camera, eyes making direct warm contact with the lens, soft smile, blonde hair down and loose over her shoulders, blue eyes, fair skin, camel cashmere sweater, 85mm, shallow depth of field, photorealistic",
  seed: 173846405,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
