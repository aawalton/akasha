import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB46f71403691cd00 = {
  id: "019f1836-d67f-7a9c-86da-73732561b422",
  type: "page-type/image",
  slug: "image-b46f71403691cd00",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a soft cotton bralette and panties lying back on the bed, relaxed candid smile toward the viewer, warm morning light, rumpled white sheets, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
