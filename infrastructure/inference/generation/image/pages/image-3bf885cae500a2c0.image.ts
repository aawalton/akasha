import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3bf885cae500a2c0 = {
  id: "019f1839-5035-754e-a71b-2c4d34c04ebe",
  type: "page-type/image",
  slug: "image-3bf885cae500a2c0",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1631433936,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-0f4036435fa8b7dd",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
