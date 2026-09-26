import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image255da7c10a2292c2 = {
  id: "01a0c5f2-eb25-7035-b677-678ac5bdd543",
  type: "page-type/image",
  slug: "image-255da7c10a2292c2",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sheer mesh bodysuit reclining on the couch, soft moody evening light, relaxed sensual gaze toward the viewer, 50mm, shallow depth of field, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
