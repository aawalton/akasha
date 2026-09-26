import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7bc702ddc46a64f4 = {
  id: "01a0c5f3-b3cb-7cc5-9b2c-4dd40f18e0aa",
  type: "page-type/image",
  slug: "image-7bc702ddc46a64f4",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman folk singer-songwriter, wavy auburn hair, light freckles across her nose, warm hazel eyes, soft natural features, gentle expression, sitting on weathered wooden porch steps with her acoustic guitar across her lap, denim overalls over a tee, golden-hour backlight, candid relaxed smile, 85mm, shallow depth of field, photoreal",
  seed: 153821120,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
