import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2621e15379fa5e38 = {
  id: "019f1839-0d63-7c2e-847b-fa6b04b50b78",
  type: "page-type/image",
  slug: "image-2621e15379fa5e38",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two young women angel lovers with white feathered wings and soft halos, one straddling the other with hips pressed close, faces a breath apart about to kiss with hands drawing each other in, tasteful bare luminous skin, one fair golden-haired and one dark-haired, radiant soft divine light, tender sensual and breathless, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80570011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
