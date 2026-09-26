import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF0789844829f0c75 = {
  id: "01a0c5f3-b3c9-7446-8762-aae332dfda34",
  type: "page-type/image",
  slug: "image-f0789844829f0c75",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman lying tangled in white sheets, one leg draped over, sleepy soft-focus morning, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 778968012,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
