import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5d35f8d91c21faf4 = {
  id: "01a0c5f3-9f6d-7e91-93ac-59773f1052fd",
  type: "page-type/image",
  slug: "image-5d35f8d91c21faf4",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic intimate close portrait of a distinctive striking young woman with a specific memorable Mediterranean face, strong elegant features and warm olive skin, dark curls, sitting close to you in a cozy warm lamplit room, her face soft with delight that it is you, warm direct eye contact, simple soft top, natural real skin texture with imperfections, intimate present and warm, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 640218,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
