import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1707dae1953adfdc = {
  id: "019f1839-039f-76f4-9dce-1d1093b21a3c",
  type: "page-type/image",
  slug: "image-1707dae1953adfdc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two beautiful young black women in their twenties, one with voluminous natural curls and one with long braids, radiant warm glamorous studio light against a soft warm background, confident luminous smiles, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80070011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
