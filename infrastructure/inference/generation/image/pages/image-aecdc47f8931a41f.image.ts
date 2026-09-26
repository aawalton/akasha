import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAecdc47f8931a41f = {
  id: "01a0c5f3-b3c8-7dd0-bbd8-e412144f56d4",
  type: "page-type/image",
  slug: "image-aecdc47f8931a41f",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "slow-smiling cowgirl in fringed suede and a cowboy hat leaning on a fence with a straw of wheat, ranch sunset, photorealistic photograph, natural skin texture, film grain",
  seed: 598133020,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
