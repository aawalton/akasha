import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF6c7e6ea909c04f9 = {
  id: "01a0c5f2-eb25-76f9-9790-56ae3f1832fd",
  type: "page-type/image",
  slug: "image-f6c7e6ea909c04f9",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a silk camisole and matching shorts set, barefoot in the kitchen pouring coffee, soft morning light, content relaxed smile, 35mm, fine fabric texture, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
