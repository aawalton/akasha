import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f826406872d21fb = {
  id: "01a0c5f3-b3c9-74f2-9c4b-f52298e82794",
  type: "page-type/image",
  slug: "image-6f826406872d21fb",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art nude woman reaching upward, elongated line of the body, dramatic single light source, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 771168816,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
