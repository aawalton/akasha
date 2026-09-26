import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3971e279fad2375a = {
  id: "01a0c5f3-efff-7dde-ad9e-471d6d74692b",
  type: "page-type/image",
  slug: "image-3971e279fad2375a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a beautiful nude blonde woman riding a man in bed, cowgirl position, slow deep rock of her hips, her hands flat on his chest, head bowed with pleasure, loose golden hair curtaining her face, full breasts, fair skin flushed pink, dim ember light before dawn, rumpled white linen, photorealistic, shallow depth of field, visible skin texture",
  seed: 2134940313,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
