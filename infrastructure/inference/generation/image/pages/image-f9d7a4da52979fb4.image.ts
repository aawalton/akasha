import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF9d7a4da52979fb4 = {
  id: "019f1839-0cf7-7c64-a81e-6a0b69de0477",
  type: "page-type/image",
  slug: "image-f9d7a4da52979fb4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young women dragon lovers with iridescent scales tracing their skin and elegant horns, lying tangled closely together, bodies pressed close and a hand drawing the other in, a breath from a kiss, tasteful bare luminous skin, one pale silver-haired and one dark auburn, smoldering warm firelight against dark, powerful and sensual, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80540011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
