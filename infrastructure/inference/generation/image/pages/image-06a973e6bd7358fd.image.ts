import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image06a973e6bd7358fd = {
  id: "01a0c5f2-eb1e-7ec0-96d2-0293573887a3",
  type: "page-type/image",
  slug: "image-06a973e6bd7358fd",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a satin slip midi skirt and knit top at a softly lit evening setting, warm ambient light, elegant relaxed smile toward the viewer, 50mm, shallow depth of field, fine fabric sheen, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
