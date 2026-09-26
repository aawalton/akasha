import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE7489dd70275c431 = {
  id: "01a0c5f2-eb21-7dbd-845d-4101b595b04a",
  type: "page-type/image",
  slug: "image-e7489dd70275c431",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a Thailand tropical beach with longtail boats and limestone cliffs, casual beach cover-up, bright sunny light, radiant happy smile, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
