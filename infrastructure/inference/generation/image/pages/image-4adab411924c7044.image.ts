import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4adab411924c7044 = {
  id: "019f5a4f-979d-7f01-82df-0d09b1ea21f8",
  type: "page-type/image",
  slug: "image-4adab411924c7044",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only cream knit thigh-high socks, sitting cross-legged on a bed hugging a knee, cozy morning light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 313828290,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
