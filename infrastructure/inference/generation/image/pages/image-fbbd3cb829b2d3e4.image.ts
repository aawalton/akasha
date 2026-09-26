import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFbbd3cb829b2d3e4 = {
  id: "01a0c5f3-3621-768f-8a1f-f6fbf4cf61d2",
  type: "page-type/image",
  slug: "image-fbbd3cb829b2d3e4",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic close-up portrait of a witty young woman streamer, head and shoulders, smirking confidently at the camera, long sleek silver-lavender hair with a few strands lifting as if in a breeze, striking violet eyes, flawless fair skin, small constellation freckles, black off-shoulder top, moody neon teal and pink studio lighting, 85mm, shallow depth of field, photorealistic",
  seed: 606,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
