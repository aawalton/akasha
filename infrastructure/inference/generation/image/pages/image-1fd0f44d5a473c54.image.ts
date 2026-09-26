import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1fd0f44d5a473c54 = {
  id: "01a0c5f2-eb22-760b-a314-b5d4b15e20d2",
  type: "page-type/image",
  slug: "image-1fd0f44d5a473c54",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime demon-hunter, patterned haori over a uniform, katana on her hip, misty forest at dusk, fierce determined expression, moody light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
