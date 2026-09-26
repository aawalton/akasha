import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image66c90e41b0406062 = {
  id: "01a0c5f2-f92d-735b-a779-6074e868f2bc",
  type: "page-type/image",
  slug: "image-66c90e41b0406062",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close framing sitting cross-legged on the bed leaning forward toward the lens, robe pooled at her elbows, slow knowing smile with locked eye contact, firefly window glow behind, hyperreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
