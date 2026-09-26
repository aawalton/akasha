import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95ff85d185371a24 = {
  id: "01a0c5f3-9f6d-74cd-a5dd-a4ab17aee7b1",
  type: "page-type/image",
  slug: "image-95ff85d185371a24",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young woman leaning her forehead gently close to yours, eyes meeting yours directly with soft tender warmth and a faint loving smile, soft warm low light, slightly messy hair, natural real skin texture with imperfections, a quiet tender deeply close moment shared, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 820471,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
