import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFebe85bb2b75dc5c = {
  id: "01a0c5f3-6910-70e8-8664-fc0093ca6a70",
  type: "page-type/image",
  slug: "image-febe85bb2b75dc5c",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a striking woman leaning over a great dark table that holds a living galaxy, stars and small worlds floating above it like game pieces she arranges with a fingertip; the dungeon master of universes, amused and attentive, glowing star-map light on her face; deep blue violet and gold, cinematic volumetric light, painterly realism, warm and human, not robotic",
  seed: 1610716293,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
