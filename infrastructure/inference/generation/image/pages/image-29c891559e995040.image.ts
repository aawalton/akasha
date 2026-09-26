import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image29c891559e995040 = {
  id: "01a0c5f2-eb1e-7579-80b2-079fd49d4e50",
  type: "page-type/image",
  slug: "image-29c891559e995040",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing under warm street lights at night, wearing a short black leather skirt and a tight cropped top, 85mm portrait, bokeh background, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
