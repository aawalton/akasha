import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image540a46547aed031a = {
  id: "019f58a5-9061-7715-9917-aebed4754b46",
  type: "page-type/image",
  slug: "image-540a46547aed031a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an opaque white milk bath scattered with rose petals, shoulders and knees above the surface, direct gaze, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1843317876,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
