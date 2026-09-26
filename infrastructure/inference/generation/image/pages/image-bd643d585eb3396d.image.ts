import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBd643d585eb3396d = {
  id: "01a0c5f4-03a4-7c5d-a3de-aaffdad01388",
  type: "page-type/image",
  slug: "image-bd643d585eb3396d",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0.9,
  resolution: "1460",
  inputImage: "image/image-fb5b849a2b11d3c1",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
