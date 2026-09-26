import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image672b43dcc8115fc1 = {
  id: "019f1839-0cf5-78b4-a683-c2d564a3e76e",
  type: "page-type/image",
  slug: "image-672b43dcc8115fc1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young women nereid sea-nymph lovers lying tangled together immersed in moonlit water, wet luminous bare skin and wet flowing hair draped with pearls, bodies pressed close and a hand drawing the other in, a breath from a kiss, one fair platinum-blonde and one dark raven-haired, cool oceanic luminosity, sensual and dreamlike, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80560011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
