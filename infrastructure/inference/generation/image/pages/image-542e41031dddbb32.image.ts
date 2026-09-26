import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image542e41031dddbb32 = {
  id: "019f58ae-88a5-7e94-9e74-8a8d6ad6b297",
  type: "page-type/image",
  slug: "image-542e41031dddbb32",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude flamenco woman with a red lace hand fan spread across her chest, dramatic Spanish light, intense gaze, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 736710056,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
