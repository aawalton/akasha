import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ad62a7cc6927995 = {
  id: "01a035b7-7b67-7000-81c3-af90f0c36b79",
  type: "page-type/image",
  slug: "image-7ad62a7cc6927995",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young West African woman, deep brown skin with a warm sheen, large dark eyes, black hair in tight coils held back from her face, striking symmetrical features, wearing a fitted corset of iridescent beetle elytra plated over her ribs in overlapping green-gold shell, the wing-cases split and lifted open behind her shoulders, bare midriff and bare arms, chitin banding her thighs, a still and patient predatory expression, in a humid nocturnal glasshouse of black orchids lit low and green, close upper-body portrait, painterly character portrait, direct eye contact with the viewer, locked-on knowing gaze, intensely detailed eyes, sharp focus on the eyes\n",
  seed: 578438501,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
