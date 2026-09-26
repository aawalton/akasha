import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7eb82beb05db04e9 = {
  id: "01a0c5f2-f92d-7539-a15c-9521d15ebed7",
  type: "page-type/image",
  slug: "image-7eb82beb05db04e9",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close-up at the moment of pulling the robe back up over her shoulder, eyes locked teasingly on the viewer mid-motion, rumpled silk around her knees, warm low light, hyperreal 50mm",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
