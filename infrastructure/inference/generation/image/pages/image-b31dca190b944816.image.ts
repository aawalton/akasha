import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB31dca190b944816 = {
  id: "01a0c5f3-8d0e-7932-933b-d569aef78ac8",
  type: "page-type/image",
  slug: "image-b31dca190b944816",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on a fur rug before an alpine chalet fireplace, firelight on bare breasts and hips, lying on her side facing the camera, snow at the window, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 773604330,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
