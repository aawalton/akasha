import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image32281c34885b9251 = {
  id: "019f1839-0c28-79c5-a52c-417f4cb3fb20",
  type: "page-type/image",
  slug: "image-32281c34885b9251",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young women lovers lying tangled closely together, a radiant angel with white feathered wings and halo and a smoldering demoness with horns and tail, bodies pressed close and a hand drawing the other in, a breath from a kiss, tasteful bare luminous skin, fair golden angel and dark raven-haired demoness, soft divine light meeting warm dark fire, sensual and breathless, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80520011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
