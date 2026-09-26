import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2a4b327ca686cce2 = {
  id: "019f1839-440f-7b38-9e0e-bd7c222ce754",
  type: "page-type/image",
  slug: "image-2a4b327ca686cce2",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 866007674,
  softness: 0.45,
  resolution: "1536",
  inputImage: "image/image-b94c36ed21df6a29",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
