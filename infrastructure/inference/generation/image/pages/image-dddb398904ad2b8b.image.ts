import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDddb398904ad2b8b = {
  id: "019f1839-0ee7-78fb-92c4-8f275de560a8",
  type: "page-type/image",
  slug: "image-dddb398904ad2b8b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young women dragon lovers with iridescent scales and elegant horns lying together with their bodies fully overlapping and pressed chest-to-chest hips-to-hips, a hand drawing the other in and a breath from a kiss, tasteful bare luminous skin, one pale silver-haired and one dark auburn, smoldering warm firelight against dark, powerful and sensual, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80650011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
