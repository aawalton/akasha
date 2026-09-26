import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8ddd43a58eec5f2d = {
  id: "01a0c5f3-8d0d-79d3-b3c1-9793233e5d10",
  type: "page-type/image",
  slug: "image-8ddd43a58eec5f2d",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a slender petite woodland fae woman, slight youthful feminine figure, delicate green wings, tousled chestnut hair, hazel eyes, gentle expression, nude natural figure, sitting gracefully on a mossy log in a dappled green forest, soft diffuse light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 862,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
