import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image49bed5edeeb4c7b0 = {
  id: "01a00fd6-254f-7a29-b818-7466d9a0d542",
  type: "page-type/image",
  slug: "image-49bed5edeeb4c7b0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful Scottish woman at dawn in the doorway of a stone croft on a heather moor, thin linen shift lit through by the pale rising sun, wool blanket loose around her shoulders and slipping, long red hair uncombed, bare feet on the threshold, looking straight at the viewer sleepily, mist across the hills, painterly realism, cool silver light\n",
  seed: 1138216241,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
