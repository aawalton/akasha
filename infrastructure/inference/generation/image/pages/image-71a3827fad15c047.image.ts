import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image71a3827fad15c047 = {
  id: "01a0c5f3-3621-767f-b3ee-498cc7053d88",
  type: "page-type/image",
  slug: "image-71a3827fad15c047",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cinematic photorealistic portrait of a greek demigoddess of the wind, mid-twenties, long flowing hair caught in a strong breeze streaming sideways, knowing proud expression with direct eye contact, faint silvery wind currents swirling around her, athletic runner physique, draped modern-classical white and gold outfit, dramatic dusk sky, rim light, 85mm, photorealistic",
  seed: 602,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
