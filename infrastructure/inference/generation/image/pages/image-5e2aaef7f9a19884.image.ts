import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5e2aaef7f9a19884 = {
  id: "01a0c5f3-f000-7fae-b552-b9e1b6c5f08b",
  type: "page-type/image",
  slug: "image-5e2aaef7f9a19884",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol figure, walking slowly through pouring rain toward the camera in a sheer wet white nightgown soaked and clinging, delighted smile, wet hair, soft overcast light, lush garden path, spontaneous candid snapshot, natural skin texture",
  seed: 397901762,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
