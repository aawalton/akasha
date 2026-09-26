import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA557c64ae6a699ee = {
  id: "019f1941-93c8-77f8-9ec0-4803968d6620",
  type: "page-type/image",
  slug: "image-a557c64ae6a699ee",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1694980777,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-ec75cc3f08f73404",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
