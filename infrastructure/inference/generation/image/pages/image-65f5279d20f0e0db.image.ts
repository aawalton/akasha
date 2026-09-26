import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image65f5279d20f0e0db = {
  id: "01a0c5f4-03a4-76c5-8b9e-8ad6af095c0d",
  type: "page-type/image",
  slug: "image-65f5279d20f0e0db",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1026329600,
  resolution: "1460",
  inputImage: "image/image-2056cab940856db3",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
