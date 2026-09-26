import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB7d835392a20b3f0 = {
  id: "01a0c5f3-7a9c-71d5-b8fc-f34b50dcaddc",
  type: "page-type/image",
  slug: "image-b7d835392a20b3f0",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Exquisitely beautiful young woman in her early twenties, fresh-faced and delicate, as a moon priestess on a white marble balcony above a silver forest at night, gown of sheer starlit gauze with a silver circlet and long loose pale hair, standing with one hand on the balustrade and the other holding a glowing moth, looking straight at the viewer with serene invitation, cool blue moonlight and drifting motes, painterly fantasy realism, luminous\n",
  seed: 240960114,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
