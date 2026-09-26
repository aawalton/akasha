import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0a1c86b6b64ea012 = {
  id: "01a0c5f2-eb24-7ee5-a7c1-7ef43ed7bfdf",
  type: "page-type/image",
  slug: "image-0a1c86b6b64ea012",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman very close to the viewer with a soft tender smile and warm eyes, intimate close-up as if foreheads nearly touching, soft morning light, shallow depth of field, visible skin texture, 50mm, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
