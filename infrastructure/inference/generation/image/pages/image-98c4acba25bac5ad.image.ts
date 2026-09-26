import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image98c4acba25bac5ad = {
  id: "019f57ec-ee3b-7429-854b-c53657066ff3",
  type: "page-type/image",
  slug: "image-98c4acba25bac5ad",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "salt-tousled woman with a wetsuit peeled to her waist over a bikini top, board under her arm walking out of the surf, misty morning break, photorealistic photograph, natural skin texture, film grain",
  seed: 674596242,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
