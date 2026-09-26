import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3c596e6c5b89f4af = {
  id: "01a0c5f3-b3c9-712d-a7fd-6219b97eca4b",
  type: "page-type/image",
  slug: "image-3c596e6c5b89f4af",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Wyoming personified as a beautiful young woman in her early twenties — light brown hair braided under a weathered western hat, rancher's canvas jacket, red Indian paintbrush wildflowers in hand, the jagged Teton range and a wild river valley behind her, immense clear frontier morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1569532446,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
