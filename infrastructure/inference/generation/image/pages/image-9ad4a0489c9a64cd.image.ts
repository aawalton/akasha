import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ad4a0489c9a64cd = {
  id: "019f1839-0c32-7e3e-95bc-d01d7b4d8205",
  type: "page-type/image",
  slug: "image-9ad4a0489c9a64cd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two young women lovers, a radiant angel with white feathered wings and a soft halo straddled by a smoldering demoness with curved horns and a sleek tail, hips pressed close, faces a breath apart about to kiss with hands drawing each other in, luminous light-and-dark contrast, tasteful bare luminous skin, the angel fair and golden and the demoness dark-haired, divine glow meeting dark fire, sensual and charged, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80510011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
