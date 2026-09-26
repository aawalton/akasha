import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image952e2f38e5d7f4b7 = {
  id: "01a0c5f3-b3ca-76f7-a4e2-95fd32fa0741",
  type: "page-type/image",
  slug: "image-952e2f38e5d7f4b7",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid portrait of a beautiful young woman with a soft warm gentle smile-laugh, eyes open and only slightly crinkling but clearly meeting yours with direct warm eye contact, sharing a quiet delighted moment with you, cozy evening room with warm string lights and a soft rain-streaked window behind her, soft loose hair, casual knit cardigan, natural real skin texture, shallow depth of field with soft bokeh, intimate warm and alive, eyes open and on you not squinted shut, close framing",
  seed: 615370,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
