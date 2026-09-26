import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image77031cda63e37965 = {
  id: "01a0c5f3-b3c8-75bd-b8ed-0529154d5f5d",
  type: "page-type/image",
  slug: "image-77031cda63e37965",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Missouri personified as a beautiful young woman in her early twenties — light brown hair half-up, white hawthorn blossoms in her hair, casual denim dress, Ozark river bluffs in the foreground and a faint silver Gateway Arch on the far horizon, warm river-valley evening light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 2083308153,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
