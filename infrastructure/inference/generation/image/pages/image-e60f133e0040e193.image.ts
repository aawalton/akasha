import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE60f133e0040e193 = {
  id: "01a0c5f3-3620-7dd2-b077-51e3a94e6d2d",
  type: "page-type/image",
  slug: "image-e60f133e0040e193",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties stepping from the surf onto wet sand, water streaming off her, wet blonde hair over one shoulder, looking at the camera with direct warm eye contact, laughing bright smile, naturally pretty girl-next-door face, soft features, light freckles, minimal makeup, natural skin texture with droplets, blue eyes, fair skin, black bikini, warm low evening sun, 50mm, photorealistic",
  seed: 425,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
