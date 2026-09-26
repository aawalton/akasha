import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image76d2684c050f6a91 = {
  id: "01a0c5f4-03a4-73cb-b75f-d46ef269c928",
  type: "page-type/image",
  slug: "image-76d2684c050f6a91",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She stretches awake across the bed in the morning light, both arms reaching overhead, sheets loose around her, the wide bedroom soft behind her. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 101,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
