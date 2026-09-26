import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f41341aa5e4de72 = {
  id: "019f1839-0e80-7387-aa7f-5fe07b586832",
  type: "page-type/image",
  slug: "image-0f41341aa5e4de72",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young women nereid lovers immersed in moonlit water, one climbing onto the other so their bodies press full frontal chest-to-chest, wet luminous bare skin and wet flowing hair draped with pearls, a breath from a kiss with a hand drawing the other in, one fair platinum-blonde and one dark raven-haired, cool oceanic luminosity, sensual and charged with chemistry, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80620011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
