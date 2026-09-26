import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAba8b4f950a41844 = {
  id: "01a0c5f3-8d0f-7f65-9d40-018fed467485",
  type: "page-type/image",
  slug: "image-aba8b4f950a41844",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "California personified as a beautiful young woman in her early twenties — sun-kissed golden skin, beach-wave blonde hair, flowing golden-poppy orange sundress, standing where Pacific surf meets golden cliffs, poppies in the foreground, photorealistic portrait, three-quarter view, hazy golden-hour coastal light",
  seed: 2086693199,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
