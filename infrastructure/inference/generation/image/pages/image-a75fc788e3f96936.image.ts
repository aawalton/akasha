import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA75fc788e3f96936 = {
  id: "01a0c5f4-03a4-7ec1-9b0f-2fc2b8e3a110",
  type: "page-type/image",
  slug: "image-a75fc788e3f96936",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She dances barefoot across the open kitchen mid-step, both arms swinging out, the wide warm room behind her. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 105,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
