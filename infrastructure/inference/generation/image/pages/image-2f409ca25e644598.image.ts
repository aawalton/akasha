import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2f409ca25e644598 = {
  id: "019f1839-3d6b-7d4f-a532-94a251fa6bd3",
  type: "page-type/image",
  slug: "image-2f409ca25e644598",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait photograph of a young woman, Caucasian, warm wavy brown hair, natural blue eyes, pretty face, a warm confident expression with a hint of quiet pride, closed lips, looking directly into the camera, a subtle spark of inspiration in her eyes. A princess and mechanical engineer in a high-fantasy solarpunk world. She wears a classic cute pure cream Lolita-style princess dress with no blue, and over it a brown leather engineer's tool-belt with pouches and a leather apron; brass goggles pushed up on her forehead. Warm golden light in a solarpunk forge of brass and flowering vines behind her. Photorealistic, hyperrealistic, realistic detailed skin, shot on DSLR 85mm, shallow depth of field, cinematic warm lighting, sharp focus.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
