import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5ceea8a50f316d52 = {
  id: "019f5b54-d433-7f94-a53b-57f7f36c66c8",
  type: "page-type/image",
  slug: "image-5ceea8a50f316d52",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "elegant woman in a summer blouse at a grand Viennese café with a melange and Sachertorte, marble tables and tall windows, refined ease, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1927924788,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
