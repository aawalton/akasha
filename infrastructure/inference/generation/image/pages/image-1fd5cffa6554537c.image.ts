import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1fd5cffa6554537c = {
  id: "019f5871-f39a-7293-a4b6-679a856757d6",
  type: "page-type/image",
  slug: "image-1fd5cffa6554537c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an open silk kimono hanging off both shoulders with nothing beneath, loosely held closed at the waist by one hand, warm light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1506208884,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
