import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image782f851359e37e3f = {
  id: "01a0c5f2-eb25-72a1-a1d3-7bee6fa464c7",
  type: "page-type/image",
  slug: "image-782f851359e37e3f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing by a bright window, wearing a nude-tone bralette and panties, backlit soft daylight, 85mm portrait, visible skin texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
