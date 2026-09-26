import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ad918d94e0e9f52 = {
  id: "01a0c5f3-efff-77bc-945f-01fa4f443d59",
  type: "page-type/image",
  slug: "image-1ad918d94e0e9f52",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "low-angle view of a beautiful nude blonde woman in her late twenties kneeling upright astride a man in bed, letting him look at her, full bare breasts, soft belly, flared hips, loose golden hair, blue eyes heavy-lidded and sure, dim ember light before dawn, fair luminous skin taking the low gold light, photorealistic, shallow depth of field, visible skin texture",
  seed: 1276205860,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
