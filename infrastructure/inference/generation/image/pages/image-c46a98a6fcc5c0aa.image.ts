import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC46a98a6fcc5c0aa = {
  id: "01a0c5f2-eb22-784e-b921-3e8bf4f0a6e9",
  type: "page-type/image",
  slug: "image-c46a98a6fcc5c0aa",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose cropped tee, sitting on a yoga mat on a wood floor, relaxed after a workout, soft daylight, gentle smile, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
