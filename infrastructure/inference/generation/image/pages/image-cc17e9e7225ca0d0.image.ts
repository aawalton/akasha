import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCc17e9e7225ca0d0 = {
  id: "019f1839-320c-7c5a-a8f9-fe515c505713",
  type: "page-type/image",
  slug: "image-cc17e9e7225ca0d0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly young woman in a close head-and-shoulders portrait, a luminous newly-made unlined face with the feeling of having just arrived, but deep still ancient eyes that have watched ages pass and grieved a little of them; timeless and classical, simple unadorned neutral drape, soft even studio light on a plain warm background, photorealistic, serene and grave",
  seed: 101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
