import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f39971de4a64cd8 = {
  id: "01a0c5f3-9f6b-748b-9a76-f951a6b1d0a6",
  type: "page-type/image",
  slug: "image-5f39971de4a64cd8",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "wistful woman in an oversized sweater slipped off one shoulder tracing rain down window glass, gray afternoon apartment, photorealistic photograph, natural skin texture, film grain",
  seed: 337927552,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
