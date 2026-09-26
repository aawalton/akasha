import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e9d3cab26b814f3 = {
  id: "01a0c5f4-03a3-7478-b9ba-862a54584028",
  type: "page-type/image",
  slug: "image-1e9d3cab26b814f3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of two young Korean women in their mid-twenties with slim petite kpop-idol builds in the rain, the one behind wrapping both arms around the others waist and resting her chin on her shoulder, both grinning with delight, drenched, wet lingerie, lush garden, soft natural light, authentic candid snapshot",
  seed: 93124683,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
