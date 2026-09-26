import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2640a6d4ea07745b = {
  id: "01a00fb7-43e9-7e6b-8b0f-1d006c3e1a1a",
  type: "page-type/image",
  slug: "image-2640a6d4ea07745b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful desert nomad woman inside a lamplit tent at night, layered indigo-dyed veils and heavy silver coin jewellery half unwound from her shoulders, kohl-lined eyes holding the viewer's gaze, a brass oil lamp casting warm patterned shadows through pierced metal across the silk walls and her skin, sand still in her hair, painterly fantasy realism\n",
  seed: 1707784065,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
