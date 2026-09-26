import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image813c4a4048a5d610 = {
  id: "01a0c5f4-03a4-7500-8fbe-5414b47bda8a",
  type: "page-type/image",
  slug: "image-813c4a4048a5d610",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She stretches awake across the bed in the morning light, both arms reaching overhead, sheets loose around her, the wide bedroom soft behind her. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 101,
  width: 1344,
  height: 576,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
