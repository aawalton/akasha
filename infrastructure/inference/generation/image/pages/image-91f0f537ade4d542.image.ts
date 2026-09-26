import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image91f0f537ade4d542 = {
  id: "01a0c5f3-b3c9-764d-9073-5f18b2046867",
  type: "page-type/image",
  slug: "image-91f0f537ade4d542",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Nevada personified as a beautiful young woman in her early twenties — jet-black hair sleek, silver-sequined dress with a sagebrush sprig corsage, high desert valley at dusk with distant neon glow on the horizon and star-filled sky above, mixed neon and moonlight, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1493648964,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
