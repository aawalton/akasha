import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c2f7256565e5b87 = {
  id: "019f1838-5df0-7678-90e3-77804419dcee",
  type: "page-type/image",
  slug: "image-1c2f7256565e5b87",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1021531195,
  resolution: "1488",
  inputImage: "image/image-42ff248d287c08d8",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
