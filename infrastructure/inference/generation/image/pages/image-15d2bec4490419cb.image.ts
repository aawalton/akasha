import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image15d2bec4490419cb = {
  id: "01a0c5f3-db28-76ec-9df9-0c6534f89ce1",
  type: "page-type/image",
  slug: "image-15d2bec4490419cb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a beautiful blonde woman in her late twenties kneeling on a bed at night, reaching up unpinning her strict hair so golden waves tumble loose around her shoulders, blue eyes on the viewer, white nightgown slipping off one shoulder baring the top of her breast, warm firelight from a hearth, 85mm portrait, shallow depth of field, visible skin texture, photorealistic",
  seed: 1997560208,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
