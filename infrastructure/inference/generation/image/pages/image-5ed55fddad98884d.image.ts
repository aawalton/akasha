import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5ed55fddad98884d = {
  id: "01a00f98-cf4f-763b-b881-2ed4fed1c558",
  type: "page-type/image",
  slug: "image-5ed55fddad98884d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A weathered fisherman in his sixties mending a net on a stone harbour wall, deep creases, salt-stiff wool jumper, overcast North Atlantic light, documentary photography, 85mm, shallow depth of field\n",
  seed: 230689238,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
