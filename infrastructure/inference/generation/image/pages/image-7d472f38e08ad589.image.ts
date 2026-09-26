import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7d472f38e08ad589 = {
  id: "01a0c5f3-b3c9-7c5f-9465-a3a0c537fa91",
  type: "page-type/image",
  slug: "image-7d472f38e08ad589",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Virginia personified as a beautiful young woman in her early twenties — dark hair swept back, colonial-inspired sage-green dress, white dogwood blossoms in her hair, Blue Ridge foothills and a red-brick colonial estate with boxwood gardens behind her, soft genteel afternoon light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 773800980,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
