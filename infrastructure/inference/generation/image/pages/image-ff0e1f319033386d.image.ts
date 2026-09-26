import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFf0e1f319033386d = {
  id: "01a0c5f3-b3cb-7cdf-8505-98cd9c261d02",
  type: "page-type/image",
  slug: "image-ff0e1f319033386d",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman jazz vocalist at a vintage microphone, natural voluminous curls, warm brown skin, small gold hoop earrings, soulful half-smile, dim smoky jazz club with bokeh lights, 85mm portrait, moody low-key lighting, visible skin texture, photoreal",
  seed: 1917909892,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
