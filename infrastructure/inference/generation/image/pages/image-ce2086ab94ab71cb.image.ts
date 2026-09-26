import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe2086ab94ab71cb = {
  id: "01a0c5f2-eb22-79f8-bd1f-8050715fdd6e",
  type: "page-type/image",
  slug: "image-ce2086ab94ab71cb",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose knotted top, standing in front of a full-length mirror, casual relaxed pose, soft bedroom light, gentle smile, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
