import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2c07325185a3e353 = {
  id: "01a0c5f3-7a9c-77b7-aed0-d0432a7cfcf4",
  type: "page-type/image",
  slug: "image-2c07325185a3e353",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on a Venetian palazzo bed arching her back off the silk, bare breasts lifted, head turned to the camera with heavy-lidded eyes, canal light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 274372447,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
