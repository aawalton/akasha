import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4128af3ee63e1b35 = {
  id: "019f1839-0cf5-727d-8321-6572229baeb7",
  type: "page-type/image",
  slug: "image-4128af3ee63e1b35",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young women genie djinn lovers, their lower bodies trailing into swirling luminous smoke, draped in gold and jewels, reclining tangled close together a breath from a kiss with hands drawing each other in, tasteful bare luminous skin, one fair with golden hair and one dark-haired, exotic warm jewel-toned magical light, sensual and otherworldly, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80550011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
