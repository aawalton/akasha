import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b5185945ecd1fe7 = {
  id: "01a0c5f3-9f6c-776f-b9c7-3030d664e7a6",
  type: "page-type/image",
  slug: "image-9b5185945ecd1fe7",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a gentle young woman sitting close by warm flickering firelight in a cozy dim room, warm amber glow on her soft features, a tender quiet smile, looking warmly and intimately toward the viewer, soft knit blanket around her shoulders, deeply safe and warm and present, intimate cinematic firelight, shallow depth of field",
  seed: 979501783,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
