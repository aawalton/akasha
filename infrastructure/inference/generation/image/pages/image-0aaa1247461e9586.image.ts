import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0aaa1247461e9586 = {
  id: "01a0c5f3-b3c9-743c-a40f-f4f84f574d7c",
  type: "page-type/image",
  slug: "image-0aaa1247461e9586",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Attractive woman sitting on a New York fire escape on a sweltering summer night, thin white slip and bare feet on the iron grating, a bottle of beer sweating beside her, knees up, looking directly at the camera, sodium street light from below and neon spill from across the street, gritty intimate 35mm photography\n",
  seed: 479911579,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
