import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF4823d80f7df6d59 = {
  id: "01a0c5f3-7a9c-79e7-bd61-b41f31f35d02",
  type: "page-type/image",
  slug: "image-f4823d80f7df6d59",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman stretching on a Ligurian balcony at sunrise, arms overhead, bare body in first light, pastel village and sea below, unashamed smile, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 260504161,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
