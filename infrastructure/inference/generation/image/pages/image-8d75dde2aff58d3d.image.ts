import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8d75dde2aff58d3d = {
  id: "01a0c5f3-f000-72dc-888a-50280ad2b40d",
  type: "page-type/image",
  slug: "image-8d75dde2aff58d3d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude couple in bed, a beautiful blonde woman astride a man leaning forward over him, her hands planted on his chest, hips joined and grinding deep, her blue eyes locked on his, golden hair spilling forward around her flushed face, full breasts hanging, fair skin sheened in warm firelight, photorealistic, shallow depth of field, visible skin texture",
  seed: 1572736384,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
