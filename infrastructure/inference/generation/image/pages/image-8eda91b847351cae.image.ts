import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8eda91b847351cae = {
  id: "01a0c5f3-7a9d-7616-829b-107bc61a93e4",
  type: "page-type/image",
  slug: "image-8eda91b847351cae",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic soft portrait of a beautiful young woman with wavy strawberry-blonde hair, wearing a delicate flowing floral sundress, in a sunlit garden with soft bokeh flowers, serene graceful feminine expression, warm romantic light, 85mm, natural skin detail, dreamy shallow depth of field",
  seed: 1863945248,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
