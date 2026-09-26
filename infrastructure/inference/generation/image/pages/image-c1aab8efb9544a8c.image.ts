import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC1aab8efb9544a8c = {
  id: "019f5bb4-3991-703d-b804-91769d61b0ba",
  type: "page-type/image",
  slug: "image-c1aab8efb9544a8c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude couple entwined in intercourse on a Venetian palazzo bed, missionary with her legs raised, gripping the sheets, canal light on their bodies, her gaze finding the camera, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 934033780,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
