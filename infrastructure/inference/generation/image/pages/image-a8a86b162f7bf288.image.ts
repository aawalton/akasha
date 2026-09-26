import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA8a86b162f7bf288 = {
  id: "019f1838-5f8b-7679-be57-ad6b9d928bec",
  type: "page-type/image",
  slug: "image-a8a86b162f7bf288",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1380533888,
  softness: 0.4,
  resolution: "1488",
  inputImage: "image/image-9070488465526e5d",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
