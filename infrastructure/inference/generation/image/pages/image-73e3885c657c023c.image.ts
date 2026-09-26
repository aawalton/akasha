import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image73e3885c657c023c = {
  id: "01a0c5f2-eb1e-73df-86c8-7421a0151326",
  type: "page-type/image",
  slug: "image-73e3885c657c023c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a flowing tulle skirt and fitted top on a rooftop at golden hour, soft breeze, dreamy warm light, joyful smile, 35mm, shallow depth of field, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
