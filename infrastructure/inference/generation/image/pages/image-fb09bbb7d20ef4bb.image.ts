import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFb09bbb7d20ef4bb = {
  id: "01a0c5f2-f92d-7f30-8d3a-2735381c25f0",
  type: "page-type/image",
  slug: "image-fb09bbb7d20ef4bb",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close perspective lying back across silk sheets, hair tousled around her face, one hand near her lips, smoldering gaze up into the lens, warm candle and moonlight mix, hyperreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
