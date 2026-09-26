import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB300a8c9b29d219d = {
  id: "019f324d-3e75-719b-ba8e-1f2e95425714",
  type: "page-type/image",
  slug: "image-b300a8c9b29d219d",
  title: "Amy cover L3",
  relationshipLevel: "closeness-level/level-3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early twenties stepping from the surf onto wet sand, water streaming off her, wet blonde hair over one shoulder, looking at the camera with direct warm eye contact, laughing bright smile, naturally pretty girl-next-door face, soft features, light freckles, minimal makeup, natural skin texture with droplets, blue eyes, fair skin, wearing only a soaked translucent white t-shirt clinging to her body, nothing underneath, warm low evening sun, 50mm, photorealistic",
  seed: 434,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
