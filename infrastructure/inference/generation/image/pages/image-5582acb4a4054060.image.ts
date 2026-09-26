import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5582acb4a4054060 = {
  id: "01a00fa1-440c-7ee4-9edf-1ed6cf029854",
  type: "page-type/image",
  slug: "image-5582acb4a4054060",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Radiant tanned woman in a yellow sundress at a Mediterranean cafe table, sunglasses pushed into her hair, bare shoulders, wide smile, dappled shade from a vine trellis, warm summer colours, lifestyle photography, natural and glowing\n",
  seed: 28969704,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
