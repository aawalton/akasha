import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ab9e1984706de30 = {
  id: "019f1839-3b7a-7d05-850b-8b606a5419a5",
  type: "page-type/image",
  slug: "image-7ab9e1984706de30",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Chest-up portrait of a young woman, Caucasian, warm wavy brown hair, natural blue eyes, lovely delicate face, warm and bright, looking directly at the viewer, a subtle gleam of inspiration in her eyes (natural eyes, not glowing). A princess and mechanical engineer in a high-fantasy solarpunk world. Classic cute cream-and-pastel Lolita princess dress, no blue and no metal on the dress, with a brown leather engineer's work-belt and apron buckled over it. Warm golden sunlight in a solarpunk workshop-garden of brass and flowering vines, softly blurred. Painterly, luminous, highly detailed face, clean skin.",
  seed: 4320,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
