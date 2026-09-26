import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF1a5581ed7947fd9 = {
  id: "01a0c5f3-8d0c-7176-8c6a-3888fd82a106",
  type: "page-type/image",
  slug: "image-f1a5581ed7947fd9",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, two beautiful young women, close companions, sharing a warm affectionate embrace in an intimate candlelit room, both turning to look directly at you with genuine warm smiles, clearly distinct from each other — one with flowing emerald-green hair and striking amber eyes, the other with soft auburn waves and green eyes, delicate feminine features, soft warm candlelight, eyes bright and open and meeting yours, natural real skin, intimate private co-presence, only the two of them in frame, photorealistic, candid, fine detail",
  seed: 758391978,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
