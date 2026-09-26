import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image93b9c4ccf0579b8c = {
  id: "01a0c5f3-9f6a-7739-937f-8535e6f78f7f",
  type: "page-type/image",
  slug: "image-93b9c4ccf0579b8c",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman among Sardinian dunes at sunset holding a sheer pareo that the wind lifts open, fabric veiling and revealing, golden grass and amber sky, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1735505756,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
