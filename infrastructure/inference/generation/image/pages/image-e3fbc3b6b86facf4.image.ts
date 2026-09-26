import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE3fbc3b6b86facf4 = {
  id: "01a0c5f3-b3cb-7b25-a64f-d8a8325214c5",
  type: "page-type/image",
  slug: "image-e3fbc3b6b86facf4",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman folk singer-songwriter, wavy auburn hair, light freckles across her nose, warm hazel eyes, soft natural features, gentle expression, sitting cross-legged on a bed writing in a songwriting notebook with her guitar beside her, cozy oversized cardigan, warm string fairy lights, soft evening glow, candid, 50mm, photoreal",
  seed: 465846319,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
