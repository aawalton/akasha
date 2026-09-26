import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image283bcd08702b6c04 = {
  id: "01a0c5f3-b3c9-73e1-8da1-1f9baec8048b",
  type: "page-type/image",
  slug: "image-283bcd08702b6c04",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful showgirl in a 1930s theatre dressing room, seated at a bulb-lit mirror in a half-unlaced silk costume and dark stockings, turning away from her reflection to look straight down the lens, feathers and cold cream jars scattered, warm bulb glow and deep backstage shadow, vintage cinematic film still, grain\n",
  seed: 2025730384,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
