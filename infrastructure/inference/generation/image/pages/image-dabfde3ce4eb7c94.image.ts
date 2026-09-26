import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDabfde3ce4eb7c94 = {
  id: "01a0c5f2-eb25-740e-b7d7-82de5c7e7ff2",
  type: "page-type/image",
  slug: "image-dabfde3ce4eb7c94",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a lace teddy lounging on the couch, one leg drawn up, relaxed sensual gaze toward the viewer, cozy evening lamplight, 50mm, shallow depth of field, fine lace detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
