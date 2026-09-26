import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEa8d10fec303cdcf = {
  id: "01a0c5f3-7a9c-7299-8193-d6b8cd4775b4",
  type: "page-type/image",
  slug: "image-ea8d10fec303cdcf",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a sheer black lace bodysuit at a Prague hotel window at night, castle lit across the river, lamplight through the lace, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 532395600,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
