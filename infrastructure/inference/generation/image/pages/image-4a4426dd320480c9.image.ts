import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4a4426dd320480c9 = {
  id: "01a0c5f3-9f6d-780b-9091-dc97c80701e4",
  type: "page-type/image",
  slug: "image-4a4426dd320480c9",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman outdoors in soft falling snow at blue hour, rosy cheeks and nose from the cold, warm breath faintly visible, delighted bright eyes meeting yours directly, snowflakes caught in her loose hair, cozy oversized scarf and soft knit hat, soft warm streetlight glow behind her, natural real skin texture, intimate and warm against the cold, shallow depth of field with soft bokeh, a fresh alive winter moment shared with you, close framing",
  seed: 367519,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
