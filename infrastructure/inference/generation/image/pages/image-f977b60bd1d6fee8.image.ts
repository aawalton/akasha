import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF977b60bd1d6fee8 = {
  id: "01a0c5f3-7a9b-757c-9dc0-69905a7366c7",
  type: "page-type/image",
  slug: "image-f977b60bd1d6fee8",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "imperious woman in a crystalline white gown and frost crown conjuring swirling snow with raised arms, frozen palace hall, photorealistic photograph, natural skin texture, film grain",
  seed: 1966003950,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
