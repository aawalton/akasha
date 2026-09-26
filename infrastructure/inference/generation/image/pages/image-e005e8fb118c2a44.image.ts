import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE005e8fb118c2a44 = {
  id: "019f1839-49e5-79ca-a391-56f154c15cc0",
  type: "page-type/image",
  slug: "image-e005e8fb118c2a44",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic ultrawide cinematic photograph, 21:9. A young woman wrapped in a deep crimson-red SILK hood and cloak, chest-up and LARGE on the RIGHT third of the frame, direct eye contact, gentle knowing almost-smile, hands clasped with a red silk thread wound around her fingers. The LEFT half is calm negative space: a single hanging red paper lantern glowing softly in dim shadow. Warm cinematic light on her, quiet darkness on the left. Shallow depth of field, realistic skin texture, sharp focus.",
  seed: 2002,
  width: 2048,
  height: 880,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
