import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD77176462938b60d = {
  id: "01a0c5f3-b3ca-7883-b8a9-f41e060d0a1a",
  type: "page-type/image",
  slug: "image-d77176462938b60d",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an open red hooded cloak with nothing beneath, deep forest behind, storybook light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 876441500,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
