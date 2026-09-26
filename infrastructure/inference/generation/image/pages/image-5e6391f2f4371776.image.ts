import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5e6391f2f4371776 = {
  id: "01a0c5f3-b3cb-7d83-94e3-c09297520caa",
  type: "page-type/image",
  slug: "image-5e6391f2f4371776",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cute anime girl with long silver hair and big violet eyes, cheerful smile, school uniform with ribbon, standing under falling cherry blossom petals, soft pastel spring palette, detailed anime illustration, cel shading, clean line art, vibrant key visual style",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
