import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF003af5d43c776c1 = {
  id: "01a0c5f3-9f6e-720c-82fc-95621de774a2",
  type: "page-type/image",
  slug: "image-f003af5d43c776c1",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol build, playfully laughing under a rainfall shower, delighted joyful expression, drenched, wet lingerie, water streaming down, steam, warm bathroom light, dynamic spontaneous candid snapshot",
  seed: 1158712191,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
