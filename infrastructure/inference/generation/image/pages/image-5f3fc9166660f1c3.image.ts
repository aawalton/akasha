import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f3fc9166660f1c3 = {
  id: "01a0c5f2-eb23-771d-8efa-072bb510afb3",
  type: "page-type/image",
  slug: "image-5f3fc9166660f1c3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a loose draped top and black tights reclining on the bed propped on one elbow, soft inviting gaze toward the viewer, warm bedside lamplight, rumpled sheets, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
