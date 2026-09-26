import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95b271723998df5b = {
  id: "01a0c5f3-9f6b-7644-811f-bde32e1560ec",
  type: "page-type/image",
  slug: "image-95b271723998df5b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman standing at a Riviera villa window in full daylight, bare breasts and hips unhidden, curtain brushing her thigh, confident sensual stare, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1969109326,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
