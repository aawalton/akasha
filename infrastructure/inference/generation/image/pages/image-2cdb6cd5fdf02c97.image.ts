import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2cdb6cd5fdf02c97 = {
  id: "01a00fc8-b1b5-71ec-a22e-ef32f50335ba",
  type: "page-type/image",
  slug: "image-2cdb6cd5fdf02c97",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman in a Weimar Berlin cabaret dressing room, sheer beaded slip over almost nothing, silk stockings rolled at the knee, cigarette holder in one hand, sitting sideways on a stool with an arched eyebrow and a wry grin straight at the camera, bare bulbs around a spotted mirror, smoky air, painterly realism, 1920s decadence\n",
  seed: 1348081092,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
