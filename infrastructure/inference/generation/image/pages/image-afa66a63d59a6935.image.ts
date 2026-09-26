import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAfa66a63d59a6935 = {
  id: "01a0c5f2-f92d-7bfb-a506-8d96d2c22b87",
  type: "page-type/image",
  slug: "image-afa66a63d59a6935",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close framing seated at the foot of the bed brushing her shoulder-length hair, robe slipped to her elbows, eyes flicking up to the camera through her lashes, firefly window glow, hyperreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
