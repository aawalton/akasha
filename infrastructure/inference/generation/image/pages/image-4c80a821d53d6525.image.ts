import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4c80a821d53d6525 = {
  id: "01a0c5f2-eb1e-7474-9255-1f7ff945d907",
  type: "page-type/image",
  slug: "image-4c80a821d53d6525",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a wine-red velvet gown standing by a grand fireplace, warm flickering firelight, refined relaxed expression, 50mm, shallow depth of field, rich fabric texture, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
