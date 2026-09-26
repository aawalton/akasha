import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD5d34088b862c178 = {
  id: "01a0c5f3-b3c8-7946-9dad-5e3aded0bfd7",
  type: "page-type/image",
  slug: "image-d5d34088b862c178",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a sleek young cat girl with a slim petite figure, slight delicate frame, black cat ears and a long black tail, bright green slit-pupil eyes, short dark hair, mysterious confident smirk, wearing a minimal black crop top and shorts, perched gracefully on a city rooftop railing at night under neon lights, tasteful, 35mm full length, photorealistic",
  seed: 872,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
