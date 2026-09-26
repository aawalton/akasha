import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image43f341f72fe6d9af = {
  id: "01a0c5f2-eb24-7846-b613-6ebdb22e5bdb",
  type: "page-type/image",
  slug: "image-43f341f72fe6d9af",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman tying her hair up with both hands by a bright window in the morning, soft backlight, casual home clothes, calm everyday expression, 50mm, soft natural light, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
