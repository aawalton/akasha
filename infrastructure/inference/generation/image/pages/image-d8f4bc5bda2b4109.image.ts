import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD8f4bc5bda2b4109 = {
  id: "01a0c5f2-f92d-7783-83f2-17a3b877364a",
  type: "page-type/image",
  slug: "image-d8f4bc5bda2b4109",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, intimate close shot stretched diagonally across the furs with both arms above her head, wrists loosely crossed, smoldering upward stare, guttering candle shadow play, hyperreal chiaroscuro",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
