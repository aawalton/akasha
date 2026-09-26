import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image24163eb2bb115eed = {
  id: "01a0c5f2-f92d-730b-a438-176ad32ff15f",
  type: "page-type/image",
  slug: "image-24163eb2bb115eed",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, intimate close shot curled on her side in furs, face filling the lower frame, half-lidded sultry stare into the camera, single guttering candle, deep warm chiaroscuro, hyperreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
