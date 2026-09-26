import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0b3f06c83b9f56d5 = {
  id: "01a00fd6-f51b-7645-bb30-b7e8a25032cf",
  type: "page-type/image",
  slug: "image-0b3f06c83b9f56d5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful Rajasthani woman inside a vast carved sandstone stepwell at noon, layered sheer saffron and magenta silks glowing where the sun strikes them, heavy silver anklets and nose chain, standing on a landing between endless geometric stairs, hand resting on the carved rail, direct steady gaze, hard shafts of light and deep cool shade, painterly realism\n",
  seed: 1939592723,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
