import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe9f7b226958bb11 = {
  id: "01a0c5f2-eb1e-7529-8928-ec6103a9ad9f",
  type: "page-type/image",
  slug: "image-ce9f7b226958bb11",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a casual denim skirt and tucked tee on a sunny city street, relaxed candid stride, warm daylight, cheerful smile toward the viewer, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
