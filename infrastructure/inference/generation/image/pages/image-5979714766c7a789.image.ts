import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5979714766c7a789 = {
  id: "01a0c5f3-9f6c-7cf0-b2a4-90c5b6dffca5",
  type: "page-type/image",
  slug: "image-5979714766c7a789",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with an acoustic guitar slung across her front, bare shoulders and legs, cozy studio corner, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 323867626,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
