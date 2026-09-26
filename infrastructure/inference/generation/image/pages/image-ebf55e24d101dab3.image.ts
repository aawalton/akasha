import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEbf55e24d101dab3 = {
  id: "01a0c5f3-6910-7ec6-ba71-b603ca2d828b",
  type: "page-type/image",
  slug: "image-ebf55e24d101dab3",
  persona: "persona/iris",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Cinematic photoreal portrait, a striking composed woman at a vast control console, a curved wall of glowing screens and windows each showing a different living world she watches over; the administrator behind the curtain, attentive and a little amused, screen-glow on her face; cool blue and warm amber light, cinematic, painterly photoreal, feminine and human, not robotic",
  seed: 1629164824,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
