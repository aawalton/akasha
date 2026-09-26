import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb1c1aacb6ee3da8 = {
  id: "019f1836-d55b-74cb-aaf7-243d16f329b3",
  type: "page-type/image",
  slug: "image-ab1c1aacb6ee3da8",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman lying back in a soft grassy meadow looking up with a relaxed smile, casual outfit, scattered wildflowers, warm afternoon light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
