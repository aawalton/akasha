import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBf9bd2fcd7dc3167 = {
  id: "01a0c5f3-8d0e-750a-a5c1-66f575155530",
  type: "page-type/image",
  slug: "image-bf9bd2fcd7dc3167",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman kneeling upright on a villa bed, thighs parted slightly, hands in her hair, bare body in golden evening light, hills out the window, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1037284415,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
