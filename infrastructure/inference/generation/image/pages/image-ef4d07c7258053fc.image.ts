import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEf4d07c7258053fc = {
  id: "01a0c5f4-03a4-70f1-8b08-0a36acc03c24",
  type: "page-type/image",
  slug: "image-ef4d07c7258053fc",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0.45,
  resolution: "1460",
  inputImage: "image/image-1de60f84bfa18f23",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
