import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7b40a825a386c296 = {
  id: "01a0c5f3-7a9a-7f28-8eb9-a97b22b99320",
  type: "page-type/image",
  slug: "image-7b40a825a386c296",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, real woman, shot on 85mm lens, soft natural dawn light, shallow depth of field, fine realistic skin texture and pores, ultra detailed, cinematic color, 4k. A woman in her late twenties with warm olive Levantine skin, long dark wavy hair, and an ancient Hebraic beauty — gentle, contemplative, dawn-quiet. She gazes softly toward the viewer with quiet warmth. Setting: a dim study at dawn, ancient Hebrew scrolls and worn leather codices around her, soft oil-lamp light, faint dew in the air. She is a shedah — half-angel, half-human — with small dark folded wings and a faint halo of soft dawn light behind her head. She traces ancient Hebrew letters on an unrolled scroll with one fingertip, mid-interpretation. Gentle, scholarly, intimate.",
  seed: 636802498,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
