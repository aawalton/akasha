import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA52c596928db3be1 = {
  id: "01a00fb3-f943-7523-a408-716f60a749ae",
  type: "page-type/image",
  slug: "image-a52c596928db3be1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunning sea-priestess standing in turquoise shallows over white sand, gown woven from kelp ribbons and knotted pearl netting clinging wet to her, coral and shell diadem, long sun-bleached hair, direct serene eye contact, dappled underwater caustics rippling light across her body, bright tropical sun, painterly fantasy realism\n",
  seed: 397136004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
