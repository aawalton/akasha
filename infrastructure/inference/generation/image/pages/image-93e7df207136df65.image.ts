import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image93e7df207136df65 = {
  id: "01a0c5f3-9f6d-7cde-bcac-6e916d3cdc54",
  type: "page-type/image",
  slug: "image-93e7df207136df65",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a beautiful young woman resting her head close to yours on a shared pillow, soft warm lamplight, large warm eyes meeting yours directly with deep acceptance and tenderness, a soft gentle smile that says you are safe and received, slightly messy hair, one bare shoulder, natural real skin texture with imperfections, a profound feeling of closeness and being accepted not judged, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 690355,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
