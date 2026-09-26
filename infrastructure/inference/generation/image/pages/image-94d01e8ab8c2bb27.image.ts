import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image94d01e8ab8c2bb27 = {
  id: "01a00fa2-2081-7273-9752-6b003c318dc3",
  type: "page-type/image",
  slug: "image-94d01e8ab8c2bb27",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Elegant ballerina with a long neck and toned shoulders, in a pale pink leotard, sitting on a studio floor with legs extended, adjusting a pointe shoe ribbon, huge windows and dust in shafts of light, graceful lines, fine art dance photography\n",
  seed: 565263165,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
