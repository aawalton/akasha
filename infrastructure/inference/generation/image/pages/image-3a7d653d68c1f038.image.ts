import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3a7d653d68c1f038 = {
  id: "01a0c5f2-eb20-7183-9433-ba986c68e340",
  type: "page-type/image",
  slug: "image-3a7d653d68c1f038",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a rocky mountain summit with a vast valley vista below, casual hiking gear, triumphant relaxed smile, bright clear daylight, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
