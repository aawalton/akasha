import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5d4d918068ca2425 = {
  id: "019f1839-0afc-706c-a6f9-8923c6eb15ed",
  type: "page-type/image",
  slug: "image-5d4d918068ca2425",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two dragon-women lovers with iridescent scales tracing their skin and small elegant horns, one straddling the other's lap, faces a breath apart in smoldering charged longing, hands drawing each other close, tasteful bare luminous skin, raven and deep auburn hair, warm fiery glow against dark atmosphere, sensual and powerful, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80470011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
