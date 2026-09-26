import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB75611478911bac1 = {
  id: "019f1838-7306-7228-a2a3-4ede98a18129",
  type: "page-type/image",
  slug: "image-b75611478911bac1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young woman with a specific memorable face, fair skin and pale grey eyes, ash-brown hair, gently raising one hand to touch your face, warm eyes meeting yours directly with deep tenderness and a soft loving smile, soft warm low light, natural real skin texture with imperfections, a deeply close tender moment, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 596328,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
