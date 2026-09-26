import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image32a869547a4ae275 = {
  id: "01a0c5f2-eb23-76ec-900d-05801ac003e5",
  type: "page-type/image",
  slug: "image-32a869547a4ae275",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a hooded assassin, dark layered leather outfit, hidden blades, rooftop at twilight, intense focused gaze, moody blue light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
