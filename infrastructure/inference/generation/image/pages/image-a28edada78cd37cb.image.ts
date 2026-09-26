import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA28edada78cd37cb = {
  id: "01a0c5f2-eb22-7cc0-8b99-9d8a28993d47",
  type: "page-type/image",
  slug: "image-a28edada78cd37cb",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose slouchy top, leaning against the kitchen counter holding a water bottle after a workout, soft warm light, relaxed smile toward the viewer, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
