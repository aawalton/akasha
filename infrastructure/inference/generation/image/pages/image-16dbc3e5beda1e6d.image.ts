import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16dbc3e5beda1e6d = {
  id: "019f23fe-5cca-735c-918a-a3f11888a735",
  type: "page-type/image",
  slug: "image-16dbc3e5beda1e6d",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 149618554,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-30d3f0c984b89678",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
