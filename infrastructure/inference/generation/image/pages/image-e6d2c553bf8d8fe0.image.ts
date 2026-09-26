import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE6d2c553bf8d8fe0 = {
  id: "019f1945-da4e-75af-a4af-8cb09d3d7f62",
  type: "page-type/image",
  slug: "image-e6d2c553bf8d8fe0",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 654164816,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-898b30b9573499b2",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
