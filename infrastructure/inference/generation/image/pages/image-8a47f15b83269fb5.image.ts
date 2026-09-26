import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a47f15b83269fb5 = {
  id: "01a0c5f2-eb1e-71f3-ae60-b062d40762fc",
  type: "page-type/image",
  slug: "image-8a47f15b83269fb5",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in a park, wearing a cute short A-line skirt and a snug pastel sweater, soft afternoon light, 85mm portrait, shallow depth of field, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
