import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image275e30b131225741 = {
  id: "01a0c5f3-7a9c-7dc2-99f8-273631c3773d",
  type: "page-type/image",
  slug: "image-275e30b131225741",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a thin ribbed camisole and briefs, hair messy from sleep, sipping coffee by a window, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 939347475,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
