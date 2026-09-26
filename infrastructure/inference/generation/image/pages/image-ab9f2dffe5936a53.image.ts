import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb9f2dffe5936a53 = {
  id: "01a0c5f3-9f6a-7c4c-9526-4de9d3f711e0",
  type: "page-type/image",
  slug: "image-ab9f2dffe5936a53",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young Brazilian woman of mixed ancestry, warm bronze skin, pale sea-green eyes, dark curling hair floating loose around her, full striking features, her own skin bioluminescing in soft cyan constellations along her collarbone and ribs and inner thighs, wearing a single layer of soaking translucent silk that clings and hides nothing, the light of her body coming straight through the wet cloth, an intent unblinking expression, suspended in deep black water with nothing else in the frame, close upper-body portrait, painterly character portrait, direct eye contact with the viewer, locked-on knowing gaze, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 1629461518,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
