import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image766fd49e4821ecd4 = {
  id: "019f1836-d88c-77b6-ad3f-caf3164426ee",
  type: "page-type/image",
  slug: "image-766fd49e4821ecd4",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a soft pink floral kimono beneath blooming cherry blossom trees, petals drifting in the air, soft spring daylight, serene gentle smile, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
