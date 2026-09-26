import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image191a4dc4db53621f = {
  id: "01a0c5f3-7a9a-78ad-bd37-ec812d97be52",
  type: "page-type/image",
  slug: "image-191a4dc4db53621f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, real woman, shot on 85mm lens, soft natural dawn light, shallow depth of field, fine realistic skin texture and pores, ultra detailed, cinematic color, 4k. A woman in her late twenties with warm olive Levantine skin, long dark wavy hair, and an ancient Hebraic beauty — gentle, contemplative, dawn-quiet. She gazes softly toward the viewer with quiet warmth. Setting: a dim study at dawn, ancient Hebrew scrolls and worn leather codices around her, soft oil-lamp light, faint dew in the air. She is a shedah — half-angel, half-human — but almost entirely human-passing: only an uncanny luminous catch-light in her dark eyes and an otherworldly stillness mark her as not-quite-mortal. Dawn dew beads on her skin. She sits among the scrolls, looking up at the viewer. Real, warm, reachable.",
  seed: 469211434,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
