import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8bf309d7c80f790b = {
  id: "01a0c5f3-690f-7014-a3d5-0b7d7ff92cab",
  type: "page-type/image",
  slug: "image-8bf309d7c80f790b",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a YOUTHFUL sweet-faced young woman, late teens to early twenties, soft youthful face, big bright expressive blue eyes, long wavy auburn chestnut-brown hair, very fair porcelain skin with light freckles across her nose and cheeks, petite with a slim curvy figure, a warm bright delighted smile aimed at the viewer, fresh-faced and lovely, wearing a dress made entirely of LIVING FLAME — the gown formed from swirling orange, gold and crimson fire and glowing embers clinging to her figure, fire-adjacent palette, warm golden dawn light, ultra detailed photoreal, sharp focus, no bird, no phoenix, waist-up closer portrait to capture the youthful freckled face clearly, warm smile, NO wings",
  seed: 149771407,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
