import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image36fe85190461d2e7 = {
  id: "01a0c5f2-eb24-7df8-8092-1c2939f3435a",
  type: "page-type/image",
  slug: "image-36fe85190461d2e7",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman curled up on a couch wrapped in a chunky knit blanket, holding a warm mug, cozy evening lamplight, soft relaxed gaze toward the viewer, 50mm, shallow depth of field, warm tones, visible fabric texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
