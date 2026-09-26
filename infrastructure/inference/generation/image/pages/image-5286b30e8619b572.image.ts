import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5286b30e8619b572 = {
  id: "01a0c5f2-eb1f-7560-857a-eb1983ab33d5",
  type: "page-type/image",
  slug: "image-5286b30e8619b572",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a brunch date, casual blouse, laughing mid-conversation at an outdoor cafe table, bright morning light, plates and coffee on the table, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
