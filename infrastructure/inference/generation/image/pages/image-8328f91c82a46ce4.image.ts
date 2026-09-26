import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8328f91c82a46ce4 = {
  id: "01a0c5f3-8d0e-7a68-8f79-5ecb6af3712e",
  type: "page-type/image",
  slug: "image-8328f91c82a46ce4",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a black bralette and sheer stockings, seated on the floor against a bed, low sensual light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 624811893,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
