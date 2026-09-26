import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image69e06755484bda72 = {
  id: "01a0c5f3-3621-7cac-a330-90a8f27c4313",
  type: "page-type/image",
  slug: "image-69e06755484bda72",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a playful young woman gamer relaxing in a cozy neon-lit room, headset around her neck, sarcastic raised eyebrow and slight smile, looking right at the camera, tousled pastel-mint dyed hair, warm fair skin, oversized cardigan over a tee, fairy lights and shelves of game figures behind in bokeh, warm and magenta light mix, 85mm, photorealistic",
  seed: 604,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
