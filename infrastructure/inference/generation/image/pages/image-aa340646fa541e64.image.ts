import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAa340646fa541e64 = {
  id: "01a0c5f2-eb23-7998-b14d-78bd92e1d5ba",
  type: "page-type/image",
  slug: "image-aa340646fa541e64",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman wearing a loose off-shoulder top and black tights, leaning against the kitchen counter holding a mug, playful soft smile toward the viewer, warm afternoon light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
