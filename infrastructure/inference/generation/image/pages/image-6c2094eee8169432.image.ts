import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c2094eee8169432 = {
  id: "019f1839-0f47-759d-ae3b-2ead8b1e4523",
  type: "page-type/image",
  slug: "image-6c2094eee8169432",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young women lovers, an elf with pointed ears and a nereid with pearl-draped wet hair, lying tangled together at the water's edge with bodies pressed full frontal chest-to-chest, a breath from a kiss with hands drawing each other in, tasteful bare luminous wet skin, one fair platinum-blonde and one dark-haired, soft luminous water light, sensual and breathless, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80660011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
