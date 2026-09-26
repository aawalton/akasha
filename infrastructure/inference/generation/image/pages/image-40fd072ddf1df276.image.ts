import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image40fd072ddf1df276 = {
  id: "01a0c5f4-03a3-7d72-a279-5d3839a6b790",
  type: "page-type/image",
  slug: "image-40fd072ddf1df276",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0,
  resolution: "1460",
  inputImage: "image/image-1de60f84bfa18f23",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
