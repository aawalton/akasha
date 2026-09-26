import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD3a034ae9d2ccce8 = {
  id: "01a0c5f3-b3c9-7f2a-9064-0592f8370b41",
  type: "page-type/image",
  slug: "image-d3a034ae9d2ccce8",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a wet clinging sheer slip, fabric translucent against her skin, dramatic light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 520649378,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
