import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image163011dfe651cc5c = {
  id: "01a0c5f4-03a3-7978-8de3-7cc78314922f",
  type: "page-type/image",
  slug: "image-163011dfe651cc5c",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0,
  resolution: "1460",
  inputImage: "image/image-fb5b849a2b11d3c1",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
