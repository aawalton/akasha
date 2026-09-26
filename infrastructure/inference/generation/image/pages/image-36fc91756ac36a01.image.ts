import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image36fc91756ac36a01 = {
  id: "01a0c5f3-b3c8-75ec-a222-f665b436861c",
  type: "page-type/image",
  slug: "image-36fc91756ac36a01",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman folk singer-songwriter, wavy auburn hair, light freckles across her nose, warm hazel eyes, soft natural features, gentle expression, full-body shot walking down an autumn tree-lined street with a guitar case slung over her shoulder, corduroy jacket and scarf, soft overcast daylight, candid, 35mm full-length, photoreal",
  seed: 99874154,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
