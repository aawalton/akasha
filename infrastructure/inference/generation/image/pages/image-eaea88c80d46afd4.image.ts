import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEaea88c80d46afd4 = {
  id: "019f1839-2413-7d4e-94ca-93a3934a7519",
  type: "page-type/image",
  slug: "image-eaea88c80d46afd4",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 2007361691,
  softness: 0.45,
  resolution: "2x",
  inputImage: "image/image-be7364140573274a",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
