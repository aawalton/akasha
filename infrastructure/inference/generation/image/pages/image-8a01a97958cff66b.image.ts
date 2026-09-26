import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a01a97958cff66b = {
  id: "01a0c5f3-b3c9-780d-a28c-9cc3544952d9",
  type: "page-type/image",
  slug: "image-8a01a97958cff66b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "North Carolina personified as a beautiful young woman in her early twenties — soft brunette curls, white dogwood blossoms in her hair, casual linen dress, Blue Ridge mountain layers fading blue into the distance behind her, hazy smoky-blue morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 479022166,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
