import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16a28f7f17666af7 = {
  id: "01a0c5f3-b3c8-713c-845c-c45c5bc6c07b",
  type: "page-type/image",
  slug: "image-16a28f7f17666af7",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a sleek young cat girl with a slim petite figure, slight delicate frame, a beautiful human girls face with soft smooth human features, small human nose, full human lips, high cheekbones, bright green slit-pupil eyes, black cat ears on top of her head and a long black tail, short dark hair, calm confident expression, nude natural figure, standing gracefully on a moonlit rooftop, soft cool light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 891,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
