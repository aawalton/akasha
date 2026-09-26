import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7eb5a57c219f43c3 = {
  id: "01a0c5f3-9f6f-70ee-9154-252058d3cf6d",
  type: "page-type/image",
  slug: "image-7eb5a57c219f43c3",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "sultry woman in a navy sequin sheath leaning on a grand piano, half-smile, supper club, hazy spotlight, photorealistic photograph, natural skin texture, film grain",
  seed: 1169530638,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
