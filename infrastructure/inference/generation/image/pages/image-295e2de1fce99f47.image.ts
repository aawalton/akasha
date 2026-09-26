import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image295e2de1fce99f47 = {
  id: "01a0c5f3-9f6a-7533-b764-310fb6a41589",
  type: "page-type/image",
  slug: "image-295e2de1fce99f47",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a soaked clinging slip at a Barcelona rooftop pool at night, city lights behind, wet fabric traced to her body, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 524429492,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
