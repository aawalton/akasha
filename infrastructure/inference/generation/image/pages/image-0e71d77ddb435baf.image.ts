import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0e71d77ddb435baf = {
  id: "01a0c5f2-eb20-7eca-beb2-91736b7fa624",
  type: "page-type/image",
  slug: "image-0e71d77ddb435baf",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman standing in a misty old-growth forest with golden sunbeams through the trees, casual outdoor layers, serene peaceful expression, soft dappled light, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
