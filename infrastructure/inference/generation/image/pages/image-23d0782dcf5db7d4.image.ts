import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image23d0782dcf5db7d4 = {
  id: "019f234f-42df-7ab3-a4f6-d7148462041a",
  type: "page-type/image",
  slug: "image-23d0782dcf5db7d4",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1889718778,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-9a3d79df2380be00",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
