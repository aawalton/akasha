import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6fa2e6082f545690 = {
  id: "019f5871-23cc-747b-b04e-7ff6691491b8",
  type: "page-type/image",
  slug: "image-6fa2e6082f545690",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a huge lush bouquet of peonies against her chest and lap, blooms the only covering, soft romantic light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1180895180,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
