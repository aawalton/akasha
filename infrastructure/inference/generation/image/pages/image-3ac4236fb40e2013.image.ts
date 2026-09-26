import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3ac4236fb40e2013 = {
  id: "01a0c5f3-2541-7ff7-97f5-adc5cbc70c67",
  type: "page-type/image",
  slug: "image-3ac4236fb40e2013",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic close-up portrait of a slim Celtic woman, head and shoulders, blazing long red hair catching the sun, vivid green eyes with direct warm eye contact, fair skin with light freckles, gentle knowing smile, soft golden summer light, blurred green meadow behind, natural makeup, 85mm, shallow depth of field, photorealistic",
  seed: 702,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
