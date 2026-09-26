import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA087732ce6651cd4 = {
  id: "019f1839-3d63-7ff6-bb3c-9e9768e0cdae",
  type: "page-type/image",
  slug: "image-a087732ce6651cd4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Chest-up portrait of a young woman, Caucasian, warm wavy brown hair, bright blue eyes, a delicate pretty face, looking directly at the viewer making eye contact, a soft subtle gleam of inspiration in her eyes (natural eyes, not glowing). She is a princess and a mechanical engineer in a high-fantasy solarpunk world. She wears a classic cute Lolita-style princess dress of cream and soft pastel lace with NO metal or clockwork on the dress, and a brown leather engineer's work-belt and apron buckled over the dress. Warm golden sunlight, a softly blurred workshop-garden of brass machines and flowering vines behind her. Painterly, luminous, highly detailed face, clean skin no smudges.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
