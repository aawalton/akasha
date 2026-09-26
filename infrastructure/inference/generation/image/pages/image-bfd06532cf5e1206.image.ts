import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBfd06532cf5e1206 = {
  id: "01a0c5f3-8d0d-74e7-b6cc-81465f66401f",
  type: "page-type/image",
  slug: "image-bfd06532cf5e1206",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of a young willow dryad, pale greenish skin with smooth bark patterning, long draping willow-frond hair like green tendrils, luminous silver-green eyes, calm melancholic expression, standing by a misty pond at dawn, soft cool light, water reflections, delicate ethereal beauty, 85mm, shallow depth of field, photorealistic",
  seed: 804,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
