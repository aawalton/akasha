import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0223ecbf32da8541 = {
  id: "01a0c5f4-03a3-71c8-a9dc-47f7d2a12569",
  type: "page-type/image",
  slug: "image-0223ecbf32da8541",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0.5,
  resolution: "1460",
  inputImage: "image/image-fb5b849a2b11d3c1",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
