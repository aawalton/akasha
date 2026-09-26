import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAe5e89bb1518acf0 = {
  id: "01a0c5f3-7a9c-7056-8b35-f7d888a415d6",
  type: "page-type/image",
  slug: "image-ae5e89bb1518acf0",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Extremely beautiful young woman in her early twenties in a dark alpine ski chalet at night, wearing a sheer white lace bodysuit with a fur throw slipping off her shoulders, long platinum hair, flawless skin and a slim toned figure, kneeling up on a sheepskin rug in front of a huge fire, looking straight at the viewer with a seductive half-smile, firelight glow and black snowy windows behind, painterly realism, warm and intimate\n",
  seed: 2115998170,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
