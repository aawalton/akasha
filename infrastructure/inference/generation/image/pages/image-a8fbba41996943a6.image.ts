import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA8fbba41996943a6 = {
  id: "019f1839-0bc9-7189-8da8-829bc963f199",
  type: "page-type/image",
  slug: "image-a8fbba41996943a6",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two pixie lovers with delicate glowing wings, one straddling the other's lap in a charged alive kiss, hands drawing each other close, tasteful bare luminous skin, rose-gold and soft silver hair, surrounded by softly glowing flowers and floating light motes, sensual and magical, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80500011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
