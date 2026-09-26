import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image20e8e872c6780418 = {
  id: "01a0c5f3-db28-72cc-a7f1-09350fd28fe8",
  type: "page-type/image",
  slug: "image-20e8e872c6780418",
  service: "image-gen-aine",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "ainez woman, the peak moment of orgasm, face overcome with pleasure, mouth open, eyes half-rolled and unfocused then closing, deep flush blooming across fair freckled skin and throat, long auburn copper hair wild and spilled across the pillow damp at the temples, neck arched back, warm golden lamplight, photoreal, cinematic, extreme close-up, the sovereign composure completely broken, raw and generous and undone, tasteful framing, bare shoulders.",
  seed: 1028510610,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
