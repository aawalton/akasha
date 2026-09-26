import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0590f3db8f7eef99 = {
  id: "01a0c5f3-9f6a-72a1-95df-9cb8996cb8e6",
  type: "page-type/image",
  slug: "image-0590f3db8f7eef99",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a Berlin loft morning wearing an open oversized shirt and nothing else, bare from collarbone to hip in a strip of sunlight, coffee in hand, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1999704819,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
