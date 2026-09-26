import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5d707a0e6c980134 = {
  id: "01a0c5f3-b3c8-70a0-b639-c2f855c222cf",
  type: "page-type/image",
  slug: "image-5d707a0e6c980134",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Connecticut personified as a beautiful young woman in her early twenties — chestnut hair in a low bun, classic navy peacoat and white scarf, mountain laurel blossoms pinned at her lapel, colonial New England village green and white steeple behind her, clear autumn afternoon light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1146813103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
