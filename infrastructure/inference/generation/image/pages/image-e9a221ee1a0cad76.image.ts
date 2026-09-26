import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE9a221ee1a0cad76 = {
  id: "01a0c5f3-9f6e-7e86-9e19-8b63aeb6151a",
  type: "page-type/image",
  slug: "image-e9a221ee1a0cad76",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman electronic music producer at a glowing synthesizer, sleek straight platinum hair, minimal modern style, headphones around neck, focused expression, neon-lit studio with teal and magenta light, 85mm portrait, shallow depth of field, photoreal",
  seed: 1738292926,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
