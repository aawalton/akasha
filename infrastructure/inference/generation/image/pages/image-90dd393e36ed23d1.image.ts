import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image90dd393e36ed23d1 = {
  id: "019f5823-a575-7ad0-9dac-9c9da552aad3",
  type: "page-type/image",
  slug: "image-90dd393e36ed23d1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "teasing woman in a cowboy hat, lace bralette and jeans seated backward on a chair, arms crossed on the chairback, warm barn-wood studio, photorealistic photograph, natural skin texture, film grain",
  seed: 1784355870,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
