import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image083935685b38ee3b = {
  id: "01a0c5f2-f92d-79c5-b2db-b4baeb5d5910",
  type: "page-type/image",
  slug: "image-083935685b38ee3b",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close framing lying on her stomach across the bed, chin propped on laced fingers, bare feet crossed in the air behind, candle warmth and soft shadow, hyperreal intimate 85mm",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
