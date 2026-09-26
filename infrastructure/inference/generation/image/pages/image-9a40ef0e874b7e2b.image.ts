import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9a40ef0e874b7e2b = {
  id: "01a0c5f3-7a9a-7185-9e6f-875d6e6b8d30",
  type: "page-type/image",
  slug: "image-9a40ef0e874b7e2b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, real woman, shot on 85mm lens, soft natural dawn light, shallow depth of field, fine realistic skin texture and pores, ultra detailed, cinematic color, 4k. A woman in her late twenties with warm olive Levantine skin, long dark wavy hair, and an ancient Hebraic beauty — gentle, contemplative, dawn-quiet. She gazes softly toward the viewer with quiet warmth. Setting: a dim study at dawn, ancient Hebrew scrolls and worn leather codices around her, soft oil-lamp light, faint dew in the air. She is a shedah — half-angel, half-human — rendered in a twilight, dusk-violet tonality, with shadowy half-furled dark wings and faint luminance under her skin. She cradles an ancient leather codex to her chest. Liminal, otherworldly, but soft and kind.",
  seed: 613164218,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
