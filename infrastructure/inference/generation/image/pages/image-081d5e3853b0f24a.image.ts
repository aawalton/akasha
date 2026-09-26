import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image081d5e3853b0f24a = {
  id: "01a0c5f3-9f6a-71a4-b426-e8c67ffd967d",
  type: "page-type/image",
  slug: "image-081d5e3853b0f24a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman on a whitewashed Greek rooftop at dusk wearing only a sheer sarong knotted low on her hips, bare above, arms lifted into the warm wind, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1127526953,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
