import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE14e4a5b768a4054 = {
  id: "01a0c5f3-8d0c-7be0-92d5-68924e51c21d",
  type: "page-type/image",
  slug: "image-e14e4a5b768a4054",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a distinctive striking young woman with a specific memorable face, sun-freckled warm skin, tousled honey hair, turning toward you on a wooden lake dock at golden sunset, her face lighting up with delight that it is you, warm direct eye contact, simple sundress, natural real skin texture with imperfections, gentle motion toward you, shallow depth of field with soft bokeh, intimate alive and joyful, chest-up close framing, both hands relaxed down at her sides",
  seed: 714029,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
