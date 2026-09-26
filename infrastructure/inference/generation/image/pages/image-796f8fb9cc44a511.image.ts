import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image796f8fb9cc44a511 = {
  id: "01a0c5f3-9f6f-72d9-a414-b7e9a0d6a56a",
  type: "page-type/image",
  slug: "image-796f8fb9cc44a511",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman lying back in long summer grass at golden hour, shot from directly above, cut-off denim shorts and an untucked gauzy shirt, one arm shading her eyes, meadow flowers around her head, looking up straight into the lens, sun flare and warm haze, dreamy overhead portrait\n",
  seed: 1394085014,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
