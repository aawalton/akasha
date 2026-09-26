import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEc8cf4db3e1686de = {
  id: "01a0c5f3-b3c9-7101-855a-da264ca9590a",
  type: "page-type/image",
  slug: "image-ec8cf4db3e1686de",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Utah personified as a beautiful young woman in her early twenties — light brown hair loose, desert hiking dress in warm earth tones, white sego lilies in hand, immense red-rock sandstone arch and canyon towers glowing behind her, radiant red-desert golden hour, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1921292824,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
