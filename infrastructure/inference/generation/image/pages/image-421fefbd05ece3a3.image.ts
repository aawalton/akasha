import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image421fefbd05ece3a3 = {
  id: "019f1838-5ec1-75cb-8acb-8521d6393fda",
  type: "page-type/image",
  slug: "image-421fefbd05ece3a3",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1096819430,
  softness: 0.4,
  resolution: "1488",
  inputImage: "image/image-42ff248d287c08d8",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
