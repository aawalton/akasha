import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF2bef5a27782ce3b = {
  id: "01a0c5f3-b3c9-7e8e-8067-8ad34d7c42fd",
  type: "page-type/image",
  slug: "image-f2bef5a27782ce3b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "South Dakota personified as a beautiful young woman in her early twenties — light brown hair loose, fringed suede jacket, pale purple pasque flowers in hand, striped Badlands formations and dark Black Hills pines behind her, dramatic clear high-plains light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1346100639,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
