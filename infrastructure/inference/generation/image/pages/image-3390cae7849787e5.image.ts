import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3390cae7849787e5 = {
  id: "01a0c5f3-f000-7137-86e8-ab80eeab8fe2",
  type: "page-type/image",
  slug: "image-3390cae7849787e5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude couple in bed, a beautiful blonde woman riding astride a man, leaning back braced on his thighs behind her, hips joined mid-rock, her body a full open arch, bare breasts lifted, head back, loose golden hair hanging behind her, his hands on her hips, ember light before dawn, rumpled white linen, photorealistic, shallow depth of field, visible skin texture",
  seed: 1836674410,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
