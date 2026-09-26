import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8f520c63885d0eff = {
  id: "019f58bf-18ec-7f54-ab8c-8d3b9aa279fe",
  type: "page-type/image",
  slug: "image-8f520c63885d0eff",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude jazz woman with a brass saxophone slung across her body, smoky club spotlight, half-smile, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 134445530,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
