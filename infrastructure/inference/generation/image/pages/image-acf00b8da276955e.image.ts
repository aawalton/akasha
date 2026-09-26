import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAcf00b8da276955e = {
  id: "01a0c5f2-eb21-7639-bada-344e8d71f5a8",
  type: "page-type/image",
  slug: "image-acf00b8da276955e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a swimsuit lying on a towel sunbathing, propped on her elbows, soft contented smile toward the viewer, warm bright daylight, sand and sea behind, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
