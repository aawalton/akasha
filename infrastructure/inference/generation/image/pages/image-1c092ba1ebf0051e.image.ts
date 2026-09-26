import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c092ba1ebf0051e = {
  id: "019f1838-761e-7c63-bb37-5fe595ca23a9",
  type: "page-type/image",
  slug: "image-1c092ba1ebf0051e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic candid portrait of a beautiful young woman with sun-kissed tan skin and long windblown dark brown hair, wearing a white cotton sundress, walking on a beach at golden hour, warm backlight, genuine relaxed smile, 85mm, natural skin texture, shallow depth of field",
  seed: 1353578352,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
