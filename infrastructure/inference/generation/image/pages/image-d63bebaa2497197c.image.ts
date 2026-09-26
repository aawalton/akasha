import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD63bebaa2497197c = {
  id: "019f1838-60ab-7ba2-8f68-5ec0312984ef",
  type: "page-type/image",
  slug: "image-d63bebaa2497197c",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1006864232,
  softness: 0.65,
  resolution: "1488",
  inputImage: "image/image-9070488465526e5d",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
