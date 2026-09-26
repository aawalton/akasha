import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image25d37d7ee12ce166 = {
  id: "01a0c5f3-8d0e-73ff-a2b6-f2f2459dc12a",
  type: "page-type/image",
  slug: "image-25d37d7ee12ce166",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with fair skin and light freckles, deep red hair loose, bright green eyes meeting the camera with warm steady tenderness, soft delighted almost-smile, resting very close in a cozy cafe corner strung with warm fairy lights, soft golden bokeh behind, simple soft mustard knit top, shallow depth of field, very close intimate framing, hands relaxed out of frame, warm joyful safe mood, natural soft skin texture, photographic, 50mm",
  seed: 205573,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
