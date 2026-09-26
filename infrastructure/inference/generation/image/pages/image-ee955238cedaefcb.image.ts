import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEe955238cedaefcb = {
  id: "01a0c5f3-b3c8-7e38-bb2f-36fa19a8a50b",
  type: "page-type/image",
  slug: "image-ee955238cedaefcb",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Minnesota personified as a beautiful young woman in her early twenties — pale blonde hair in twin braids, cozy Nordic patterned sweater, holding a showy pink lady's slipper flower, mirror-calm north-woods lake with a canoe and pines behind her, cool loon-hour dusk light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1815227246,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
