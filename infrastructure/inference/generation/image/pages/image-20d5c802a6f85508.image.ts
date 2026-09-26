import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image20d5c802a6f85508 = {
  id: "01a00fb5-9dcb-7fe5-9170-d2b3314e4637",
  type: "page-type/image",
  slug: "image-20d5c802a6f85508",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Attractive fae woman crouched among giant glowing mushrooms on the floor of a black forest, dressed in moss, bark plates and torn spider-silk gauze, antler-like branches in her tangled hair, bare thighs, looking up directly at the viewer with a wild grin, teal foxfire glow from the fungi lighting her from below, painterly dark fantasy realism\n",
  seed: 556939403,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
