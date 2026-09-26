import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image896dce60335cb2fa = {
  id: "01a0c5f3-8d0e-7ff6-9b3b-0983ca15465c",
  type: "page-type/image",
  slug: "image-896dce60335cb2fa",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties as a spring flower fae in a dawn meadow, gown of layered petals and gossamer clinging to her figure, small translucent wings catching the light, strawberry blonde hair full of blossom, kneeling in the wet grass among wildflowers, looking up at the viewer with a soft delighted smile, golden low sun and dew sparkling, painterly fantasy realism, tender and radiant\n",
  seed: 1288166901,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
