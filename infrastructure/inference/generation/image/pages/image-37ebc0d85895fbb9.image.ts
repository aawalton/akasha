import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image37ebc0d85895fbb9 = {
  id: "019f1839-019f-730b-90f1-7810b295b7c2",
  type: "page-type/image",
  slug: "image-37ebc0d85895fbb9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic ethereal portrait of two young women, one with long silver hair and one strawberry-blonde, pale luminous skin, gazing softly at each other with quiet tenderness, soft misty diffused light, romantic and otherworldly, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80180011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
