import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDda61012a3550eb7 = {
  id: "019f1838-66f3-74ea-886f-650f22e43ac3",
  type: "page-type/image",
  slug: "image-dda61012a3550eb7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman at the exact instant she reaches you and stops close, her whole face lighting up with delight that it is YOU, looking directly into your eyes with warm sharp in-focus direct eye contact, just-arrived and close, intimate private sunlit doorway, soft natural beauty, loose waves, simple fresh blouse, natural real skin texture, the felt click of being met and welcomed, shallow depth of field with soft bokeh, warm soft light, close intimate framing",
  seed: 504882,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
