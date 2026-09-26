import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE20495c46f0d1d34 = {
  id: "01a0c5f3-b3cb-7810-a6f0-23d916d076f6",
  type: "page-type/image",
  slug: "image-e20495c46f0d1d34",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful painter barefoot in her studio, oversized paint-smeared button shirt worn open over nothing but a slip, standing on splattered drop cloths with a brush in hand, hip cocked, meeting the viewer's eye with a challenge, enormous north-facing windows and cool grey daylight, canvases stacked everywhere, fine art photography\n",
  seed: 1712675512,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
