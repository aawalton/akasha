import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image89b64c406139d2f3 = {
  id: "01a0c5f3-7a9a-7468-930e-f26343b02dbf",
  type: "page-type/image",
  slug: "image-89b64c406139d2f3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, real woman, shot on 85mm lens, shallow depth of field, fine realistic skin texture and pores, ultra detailed, cinematic color, 4k. A woman in her late twenties with warm olive Levantine skin and an ancient Hebraic beauty — gentle, contemplative, dawn-quiet. Close, intimate portrait, leaning at a study table with one hand resting near an open scroll so her fingernails are visible. She gazes softly toward the viewer with quiet warmth. She is a shedah — half-angel, half-human — shown WITHOUT wings and WITHOUT any halo: bathed in soft luminous angelic light, a divine glow that rim-lights her and catches floating motes of dew in the air, as though dawn itself is sanctifying her. Setting: a dim study at dawn, ancient Hebrew scrolls and worn leather codices, soft oil-lamp light. Her color is copper throughout, a matched palette: warm glowing copper eyes, long flowing COPPER-AUBURN metallic hair, and copper-lacquered fingernails. Warm, otherworldly, coherent in copper.",
  seed: 1968506792,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
