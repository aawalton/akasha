import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBd0cf29d76f14cf4 = {
  id: "019f1839-49ed-7483-bf3f-bf1eb2ca8e14",
  type: "page-type/image",
  slug: "image-bd0cf29d76f14cf4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic ultrawide cinematic photograph, 21:9, dark nighttime outdoors. A young woman wrapped in a deep crimson-red SILK hood and cloak, chest-up and LARGE on the RIGHT third of the frame, direct eye contact, gentle knowing almost-smile, hands clasped with a red silk thread wound around her fingers, softly lit by moonlight. The LEFT half is calm dark negative space: a low pale moon hanging over a dim shadowed landscape, deep night sky. Low-key moonlit lighting, deep shadows, realistic skin texture, shallow depth of field, sharp focus.",
  seed: 2004,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
