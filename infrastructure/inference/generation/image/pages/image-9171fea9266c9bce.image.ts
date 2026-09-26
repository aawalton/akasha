import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9171fea9266c9bce = {
  id: "01a0c5f4-03a3-756e-a53b-0692b177618a",
  type: "page-type/image",
  slug: "image-9171fea9266c9bce",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0,
  resolution: "1460",
  inputImage: "image/image-15a98654134d2402",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
