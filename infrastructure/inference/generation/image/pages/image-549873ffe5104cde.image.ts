import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image549873ffe5104cde = {
  id: "01a0c5f3-8d0d-7db9-82d2-7a589f448956",
  type: "page-type/image",
  slug: "image-549873ffe5104cde",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a willowy petite autumn fae woman, slender youthful figure, small frame, amber leaf-veined wings, long auburn hair flowing loose, golden eyes, gentle serene look, nude natural figure, standing among falling leaves in a glowing golden autumn forest, warm low backlight, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 866,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
