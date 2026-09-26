import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3faf7a0545dd2c47 = {
  id: "01a0c5f2-eb24-77ce-a7f4-cba1d83f18ca",
  type: "page-type/image",
  slug: "image-3faf7a0545dd2c47",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, lying in bed just waking up, head on a soft white pillow, tousled hair, sleepy tender smile looking up at the viewer, warm morning sunlight through sheer curtains, rumpled white sheets, 50mm, shallow depth of field, visible skin texture, soft natural light, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
