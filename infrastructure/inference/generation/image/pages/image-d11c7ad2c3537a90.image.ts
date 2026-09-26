import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD11c7ad2c3537a90 = {
  id: "01a0c5f3-f000-7f5c-8d0a-a90621afc0eb",
  type: "page-type/image",
  slug: "image-d11c7ad2c3537a90",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 451319303,
  resolution: "1460",
  inputImage: "image/image-1de60f84bfa18f23",
  serviceVersions: ["mlx 0.31.0"],
} as const satisfies Image
