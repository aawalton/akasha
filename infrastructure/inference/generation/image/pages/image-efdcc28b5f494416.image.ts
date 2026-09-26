import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEfdcc28b5f494416 = {
  id: "01a0c5f3-b3c8-7647-9aef-c3daeda23a72",
  type: "page-type/image",
  slug: "image-efdcc28b5f494416",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an enormous slouchy knit sweater slipping off one shoulder and barely covering the tops of her thighs, bare legs, cozy morning light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 12344768,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
