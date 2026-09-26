import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1b7ba15ee5bcf488 = {
  id: "01a0c5f2-eb24-7a5b-b0e4-ffd08b78f6ba",
  type: "page-type/image",
  slug: "image-1b7ba15ee5bcf488",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sheer babydoll nightie sitting on the edge of the bed, soft tender gaze toward the viewer, warm bedside lamplight, rumpled sheets, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
