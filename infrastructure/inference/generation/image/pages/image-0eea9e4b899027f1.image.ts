import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0eea9e4b899027f1 = {
  id: "01a0c5f3-3621-7c46-a9b4-78440e227a61",
  type: "page-type/image",
  slug: "image-0eea9e4b899027f1",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cinematic photorealistic portrait of a fierce fast huntress demigoddess, mid-twenties, mid-stride turning to smirk at the camera with direct eye contact, long dark windblown hair, sharp bright eyes, lithe athletic build, light leather-and-cloth huntress outfit in white and silver, a sense of speed and wind around her, forest at dawn, dynamic rim light, 85mm, photorealistic",
  seed: 605,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
