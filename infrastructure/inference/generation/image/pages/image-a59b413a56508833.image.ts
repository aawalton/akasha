import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA59b413a56508833 = {
  id: "01a0c5f2-f92d-71f6-9361-6646bf0599ee",
  type: "page-type/image",
  slug: "image-a59b413a56508833",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close-up kneeling among rumpled sheets, arms relaxed, chin lowered with eyes raised to the viewer, morning light glowing through the sheer robe, hyperreal 50mm",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
