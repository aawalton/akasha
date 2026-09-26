import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48545ef7353de05a = {
  id: "01a0c5f3-8d0e-78e0-ba7c-a8289e76043f",
  type: "page-type/image",
  slug: "image-48545ef7353de05a",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunningly beautiful woman reclining on the marble steps of a palace bathing pool strewn with rose petals, damp translucent linen clinging to her, gold cuffs at her wrists and a fine chain at her waist, long dark hair spilling over the stone, soft feminine curves, warm sunlight falling through a carved lattice screen in patterns across her skin, painterly fantasy realism, gold and rose\n",
  seed: 1196761005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
