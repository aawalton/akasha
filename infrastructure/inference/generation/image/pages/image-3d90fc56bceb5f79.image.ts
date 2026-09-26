import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d90fc56bceb5f79 = {
  id: "01a0c5f3-8d0f-7793-afcd-07729b210f7e",
  type: "page-type/image",
  slug: "image-3d90fc56bceb5f79",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ethereal beautiful woman on the open deck of a sky-ship above a sea of cloud at sunrise, layered pink and cream chiffon streaming sideways in the wind and pressed against her figure, long hair lifted, one hand on a brass rail, looking back at the viewer, soft rose and gold dawn light everywhere, painterly fantasy realism, weightless and lovely\n",
  seed: 2014043874,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
