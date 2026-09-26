import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC3ba6f5f7364114b = {
  id: "01a0c5f3-9f6d-7299-8231-6edc1f6286b2",
  type: "page-type/image",
  slug: "image-c3ba6f5f7364114b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of an elegant adult autumn fae woman, mid-twenties, willowy figure, large amber-veined wings like leaves, long auburn hair, golden eyes, alluring serene expression, dress woven of red and gold leaves, standing among falling autumn foliage in a glowing forest, warm low sunlight, 35mm full length, photorealistic",
  seed: 842,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
