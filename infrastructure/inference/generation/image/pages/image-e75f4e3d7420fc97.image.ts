import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE75f4e3d7420fc97 = {
  id: "01a0c5f2-eb25-7908-88e3-a8693a47307f",
  type: "page-type/image",
  slug: "image-e75f4e3d7420fc97",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a structured lace corset and panties admiring herself in a full-length mirror, soft warm dressing-room light, confident expression, 50mm, shallow depth of field, fine detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
