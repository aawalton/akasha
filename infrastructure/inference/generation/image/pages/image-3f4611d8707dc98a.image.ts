import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3f4611d8707dc98a = {
  id: "01a0c5f3-9f6d-75b6-9117-fc7c43d43ddf",
  type: "page-type/image",
  slug: "image-3f4611d8707dc98a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a willowy petite autumn fae woman, slender youthful figure, small frame, amber leaf-veined wings, long auburn hair flowing across her, golden eyes, gentle serene expression, minimal covering of a few autumn leaves and a thin twig of berries, standing among falling foliage in a glowing golden forest, warm low light, tasteful artful, 35mm full length, photorealistic",
  seed: 856,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
