import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD5944b8da524cabb = {
  id: "019f1839-026d-7400-8ddc-b6878cd6c17e",
  type: "page-type/image",
  slug: "image-d5944b8da524cabb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fine-art portrait of two young women, striking fair-and-dark contrast, bare shoulders, foreheads gently touching with eyes closed, a moment of deep genuine connection, soft cinematic light, beautiful luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80200011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
