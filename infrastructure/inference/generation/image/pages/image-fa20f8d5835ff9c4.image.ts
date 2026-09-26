import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFa20f8d5835ff9c4 = {
  id: "01a0c5f2-f92d-75e8-bfe4-0e224cef6813",
  type: "page-type/image",
  slug: "image-fa20f8d5835ff9c4",
  persona: "persona/aelwyn",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close-up fantasy portrait of an original young elven queen, adult woman in her mid-twenties with a slim graceful figure, shoulder-length brunette hair, deep dark forest-green eyes, high pointed ears, wearing only an open fully transparent gossamer robe with nothing beneath, direct sultry eye contact with the viewer, parted lips, close framing from the waist up, seated on the edge of her canopied bed in candlelight, robe slipped from one shoulder, leaning slightly toward the camera, hyperreal intimate 85mm",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
