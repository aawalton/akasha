import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image697f8928ff1d7470 = {
  id: "01a0c5f4-03a4-71cc-a700-642dfc823dc1",
  type: "page-type/image",
  slug: "image-697f8928ff1d7470",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0.7,
  resolution: "1460",
  inputImage: "image/image-1de60f84bfa18f23",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
