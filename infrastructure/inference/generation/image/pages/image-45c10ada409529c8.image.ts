import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image45c10ada409529c8 = {
  id: "01a0c5f3-8d0d-7cc6-a3aa-f99827960807",
  type: "page-type/image",
  slug: "image-45c10ada409529c8",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a slim petite night fae woman, slight delicate figure, luminous violet moth wings, long dark hair sweeping across her body, glowing lavender eyes, serene expression, wearing only wisps of sheer gossamer and shadow, hovering in a moonlit forest with fireflies, cool violet magical light, tasteful artful, 35mm full length, photorealistic",
  seed: 853,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
