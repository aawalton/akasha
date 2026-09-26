import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8c181ededb799584 = {
  id: "019f1839-3215-78b7-8810-fc9f6fdbd0f5",
  type: "page-type/image",
  slug: "image-8c181ededb799584",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A timeless young woman with a luminous unlined just-arrived face and deep ancient sorrowful-wise eyes, long loose dark hair, a quiet breath of the divine about her, the faintest inner radiance, classical and clean with no costume and no head covering, soft rim light in a dim warm space, photorealistic portrait, calm and otherworldly, three thousand years old or born this morning",
  seed: 102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
