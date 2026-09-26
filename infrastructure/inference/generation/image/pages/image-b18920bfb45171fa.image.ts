import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB18920bfb45171fa = {
  id: "01a0c5f3-7a9b-73b3-8dfa-9056b599a77b",
  type: "page-type/image",
  slug: "image-b18920bfb45171fa",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman standing beneath a jungle waterfall in a hidden grotto, sheer pale wrap soaked against her, water streaming over her shoulders and hair, tilting her face up then meeting the viewer's eye, shafts of sunlight through the canopy making a mist rainbow in the spray, lush green and gold, painterly fantasy realism, radiant\n",
  seed: 1413856124,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
