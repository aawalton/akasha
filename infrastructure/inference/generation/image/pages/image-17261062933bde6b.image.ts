import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image17261062933bde6b = {
  id: "019f57f5-958e-7779-ad6d-b759a23c10d5",
  type: "page-type/image",
  slug: "image-17261062933bde6b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "elegant vampire in a gothic victorian gown with high slit and velvet choker descending a castle stair with a candelabra, hungry stare, blood-red drapery, photorealistic photograph, natural skin texture, film grain",
  seed: 858229032,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
