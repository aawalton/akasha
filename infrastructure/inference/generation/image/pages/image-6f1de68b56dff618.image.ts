import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f1de68b56dff618 = {
  id: "019f584f-012b-769c-9852-f8ca9495255e",
  type: "page-type/image",
  slug: "image-6f1de68b56dff618",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman standing at a window from behind at dawn, soft pink light on her back and hips, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 156125096,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
