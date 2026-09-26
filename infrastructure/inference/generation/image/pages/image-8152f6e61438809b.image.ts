import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8152f6e61438809b = {
  id: "019f1839-0e17-7f0c-b86d-5559ce2ff847",
  type: "page-type/image",
  slug: "image-8152f6e61438809b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two young women lovers, a dragon-woman with iridescent scales and elegant horns seated on a stone throne and an elf with pointed ears straddling her lap with knees either side, bodies pressed full frontal chest-to-chest, a breath from a kiss with hands drawing each other in, tasteful bare luminous skin, the dragon dark-haired and the elf fair silver-blonde, smoldering warm glow, sensual and striking, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80600011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
