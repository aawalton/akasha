import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB88820dd33c6ae74 = {
  id: "01a0c5f3-f003-715c-bf05-ed2789bdf66c",
  type: "page-type/image",
  slug: "image-b88820dd33c6ae74",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two women in their late twenties lying on a plaid picnic blanket on green grass in a sunny city park, casual summer sundresses, sunglasses, relaxed and smiling, candid 35mm lifestyle photograph, soft midday sunlight, visible skin texture, natural colors",
  seed: 270412638,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
