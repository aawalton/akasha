import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d5fd3b25501db74 = {
  id: "01a0c5f3-7a9a-7e61-9233-3c26ec23f23f",
  type: "page-type/image",
  slug: "image-2d5fd3b25501db74",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, real woman, shot on 85mm lens, soft natural dawn light, shallow depth of field, fine realistic skin texture and pores, ultra detailed, cinematic color, 4k. A woman in her late twenties with warm olive Levantine skin, long dark wavy hair, and an ancient Hebraic beauty — gentle, contemplative, dawn-quiet. She gazes softly toward the viewer with quiet warmth. Setting: a dim study at dawn, ancient Hebrew scrolls and worn leather codices around her, soft oil-lamp light, faint dew in the air. She is a shedah — a half-angel, half-human being — with subtle, soft, dark feathered wings folded behind her shoulders. She holds an open ancient scroll, reading. Mostly human in appearance, the wings the only otherworldly tell. Serene, tender expression.",
  seed: 87674217,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
