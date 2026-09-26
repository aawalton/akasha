import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3f0d0e4307ea736f = {
  id: "019f1839-49e0-77a3-8c11-7b1bf85bfcef",
  type: "page-type/image",
  slug: "image-3f0d0e4307ea736f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic ultrawide cinematic photograph, 21:9, dark moody nighttime. A young woman wrapped in a deep crimson-red SILK hood and cloak, chest-up and LARGE on the RIGHT third of the frame, direct eye contact, gentle knowing almost-smile, hands clasped at her chest with a red silk thread wound around her fingers, lit by soft cool moonlight. The LEFT half is calm dark negative space: a dim misty forest at night, dark trees and faint drifting mist under faint moonlight. Low-key lighting, deep shadows, realistic skin texture, shallow depth of field, sharp focus.",
  seed: 2003,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
