import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD4854fca5fcd30f5 = {
  id: "019f5877-16a8-78f0-8fdb-f6f522cea4ed",
  type: "page-type/image",
  slug: "image-d4854fca5fcd30f5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman adorned only with a delicate draping gold body chain across her torso, jewelry as the only covering, warm glow, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1672126753,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
