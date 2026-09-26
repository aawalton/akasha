import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd3b5bc97b7e4ccd = {
  id: "01a0c5f3-8d0e-71e3-944d-cb8e96624367",
  type: "page-type/image",
  slug: "image-cd3b5bc97b7e4ccd",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman lying on her stomach on rumpled linen, bare back and bottom in morning sun, chin on her hands, teasing smile, lavender out the window, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 431375811,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
