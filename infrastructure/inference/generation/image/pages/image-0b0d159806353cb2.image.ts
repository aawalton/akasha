import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0b0d159806353cb2 = {
  id: "01a0c5f3-b3ca-790d-87b7-df3fca3a950a",
  type: "page-type/image",
  slug: "image-0b0d159806353cb2",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid portrait, a beautiful young woman mid-laugh turning to share the moment directly with you, warm crinkled eyes meeting yours, caught genuinely laughing at something just between the two of you, soft slightly messy hair, cozy sunlit morning kitchen with warm light behind her, casual soft oversized sweater, natural real skin texture with light freckles, the felt sense of being IN the moment together as her companion rather than watching her, shallow depth of field with soft bokeh, intimate and warm and alive, close framing",
  seed: 138472,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
