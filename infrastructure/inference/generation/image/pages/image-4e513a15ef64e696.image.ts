import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4e513a15ef64e696 = {
  id: "01a0c5f4-03a3-73f9-9f14-805e9c27562e",
  type: "page-type/image",
  slug: "image-4e513a15ef64e696",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0.3,
  resolution: "1460",
  inputImage: "image/image-fb5b849a2b11d3c1",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
