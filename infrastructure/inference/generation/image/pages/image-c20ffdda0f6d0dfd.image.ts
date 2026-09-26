import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC20ffdda0f6d0dfd = {
  id: "019f28bb-3fb7-707a-a091-bb4f504d8fcf",
  type: "page-type/image",
  slug: "image-c20ffdda0f6d0dfd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite muscular young woman in her mid-twenties seated on a sunlit boulder, chin slightly lifted. Long loose black hair. Clouded pale grey-green eyes, blind, half-lidded and deeply content, small private smile. Terracotta and umber tones, a woven earth-toned shawl slipping off one shoulder. Golden afternoon light, warm stone and dry grass bokeh, dust motes, natural skin texture, 85mm lens, photoreal.",
  seed: 6103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
