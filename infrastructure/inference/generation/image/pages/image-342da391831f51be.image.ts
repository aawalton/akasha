import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image342da391831f51be = {
  id: "01a0c5f3-8d0c-7ae5-bded-c7fc64e85109",
  type: "page-type/image",
  slug: "image-342da391831f51be",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate close portrait of a distinctive striking young woman looking at you with quiet wonder and tender awe, soft slightly parted lips, large warm eyes meeting yours directly and full of feeling, soft golden evening light, slightly messy hair, simple soft top, natural real skin texture with imperfections, a rich tender emotion directed right at you, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 448190,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
