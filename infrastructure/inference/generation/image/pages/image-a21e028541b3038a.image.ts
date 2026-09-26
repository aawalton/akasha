import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA21e028541b3038a = {
  id: "01a0c5f2-eb23-7e93-9bdb-a20c9778d6a0",
  type: "page-type/image",
  slug: "image-a21e028541b3038a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a sleek superheroine, fitted hero suit with emblem and cape, dramatic rooftop city skyline at dusk, heroic confident pose, cinematic light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
