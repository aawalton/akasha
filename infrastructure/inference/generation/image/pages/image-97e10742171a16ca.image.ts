import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image97e10742171a16ca = {
  id: "019f5813-baf2-71a1-97a3-e295418d956a",
  type: "page-type/image",
  slug: "image-97e10742171a16ca",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "sequin-topped woman doubled over mid-laugh with a mascara tear, pure joy, crowded kitchen at a house party, photorealistic photograph, natural skin texture, film grain",
  seed: 1132989531,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
