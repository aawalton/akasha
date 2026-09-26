import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image45d1b8207b6953b1 = {
  id: "01a0c5f2-f92d-7d2f-a763-e21a7c276145",
  type: "page-type/image",
  slug: "image-45d1b8207b6953b1",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close perspective sitting against the carved headboard among pillows, one knee drawn up, head tilted resting on the wood, slow smile into the lens, moonlight and candle gold, hyperreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
