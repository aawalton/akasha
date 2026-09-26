import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD7feab14f759fa6a = {
  id: "019f1839-0010-72a4-a216-3c27a4dfb720",
  type: "page-type/image",
  slug: "image-d7feab14f759fa6a",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "aelwynz woman, golden-hour closeup portrait, natural light, photo",
  seed: 1758552899,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
