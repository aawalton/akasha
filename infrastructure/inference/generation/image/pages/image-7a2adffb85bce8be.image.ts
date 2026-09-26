import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7a2adffb85bce8be = {
  id: "01a0c5f3-2542-7ba2-a3a6-a79af00f28c4",
  type: "page-type/image",
  slug: "image-7a2adffb85bce8be",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a woman in her early 30s at a writing desk by a tall window, golden hour light, blonde hair loose over her shoulders, blue eyes glancing up warmly, fair skin, camel cashmere sweater, fountain pen and handwritten notes on the desk, 50mm, shallow depth of field, photorealistic",
  seed: 788685590,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
