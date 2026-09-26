import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe471c9dae820d86 = {
  id: "01a00fb1-81c4-7ae0-ad3f-efed3798c26a",
  type: "page-type/image",
  slug: "image-ce471c9dae820d86",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful pale woman standing barefoot on a frozen lake beneath a green aurora, wrapped in a heavy white wolf-pelt cloak thrown open over a fitted silver scale-mail shift, frost in her long braided hair, holding a bone-handled spear loosely, looking straight at the viewer, aurora light rippling green and violet across the ice and her skin, painterly fantasy realism, cold and luminous\n",
  seed: 464050381,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
