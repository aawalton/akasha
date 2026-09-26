import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDd85993bf5c266e9 = {
  id: "01a0c5f3-9f6a-786d-883f-294b38d2bb49",
  type: "page-type/image",
  slug: "image-dd85993bf5c266e9",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "feral-grinned woman in a moss-and-vine wrap dress half-hidden behind ferns peeking at camera, dappled old-growth forest, photorealistic photograph, natural skin texture, film grain",
  seed: 1519836127,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
