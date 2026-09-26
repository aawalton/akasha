import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAd2b941d8a3612fe = {
  id: "019f2350-88fe-710f-892a-feaa15dff94b",
  type: "page-type/image",
  slug: "image-ad2b941d8a3612fe",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 531988342,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-9a3d79df2380be00",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
