import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFd66bf2d08bb2bbb = {
  id: "019f1836-dc6b-7e3d-b301-4ea3785748a6",
  type: "page-type/image",
  slug: "image-fd66bf2d08bb2bbb",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a pleated mini skirt and fitted knit top at an outdoor cafe, casual chic, warm light, relaxed smile toward the viewer, 50mm, shallow depth of field, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
