import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image227310b4e21c67c0 = {
  id: "01a0c5f2-eb1e-7061-a0a2-e95488a90e19",
  type: "page-type/image",
  slug: "image-227310b4e21c67c0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a fitted silver mermaid gown on a theater stage, dramatic spotlight, poised glamorous expression, 85mm, shallow depth of field, fine fabric sheen, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
