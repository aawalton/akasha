import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFfef0b031166448e = {
  id: "01a0c5f3-8d0e-75c7-9559-aa242e941705",
  type: "page-type/image",
  slug: "image-ffef0b031166448e",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous Black woman in an art nouveau Paris apartment at morning, standing in front of a tall window in a sheer cream peignoir that the light passes straight through, silhouetting her figure, one hand on the curtain, glancing over at the viewer with an amused expression, stained glass edging and potted palms, soft luminous backlight, painterly realism, elegant\n",
  seed: 744006190,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
