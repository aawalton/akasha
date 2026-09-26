import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCddac5e12b63dfc8 = {
  id: "01a0c5f3-9f6d-7b7b-9471-9dc5f47b2fa3",
  type: "page-type/image",
  slug: "image-cddac5e12b63dfc8",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, two beautiful young women who are close friends together in a cozy lamplit room, leaning into a warm affectionate hug, both turning to look directly at you with delighted genuine smiles, the two clearly DIFFERENT from each other — one with warm auburn waves in a soft rust-colored sweater, the other with dark straight hair in a cream knit — natural real skin with subtle imperfection, soft warm directional light, eyes bright and open and meeting yours, intimate private co-presence, photorealistic, candid, fine detail",
  seed: 1550509178,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
