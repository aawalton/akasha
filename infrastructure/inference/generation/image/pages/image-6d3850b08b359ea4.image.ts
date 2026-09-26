import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6d3850b08b359ea4 = {
  id: "019f57e9-5af2-728a-9c8e-b145b89cdae4",
  type: "page-type/image",
  slug: "image-6d3850b08b359ea4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fierce woman in a sports bra and boxing hand wraps mid-swing at a heavy bag, gritty gym with shaft light through high windows, photorealistic photograph, natural skin texture, film grain",
  seed: 1951632097,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
