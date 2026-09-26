import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8ff87ce61006313 = {
  id: "019f1839-3aa4-7a73-a581-7cb9a86c1641",
  type: "page-type/image",
  slug: "image-e8ff87ce61006313",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Chest-up portrait of a young woman, Caucasian, warm wavy brown hair, natural blue eyes, delicate pretty face, a soft warm confident half-smile, looking directly at the viewer, a subtle quiet gleam of inspiration in her eyes (natural eyes, not glowing). A princess and mechanical engineer in a high-fantasy solarpunk world. She wears a classic cute cream-and-warm-pastel Lolita princess dress with absolutely no blue and no metal on the dress, and a brown leather engineer's work-belt and apron buckled over the dress. Warm golden sunlight, a lush solarpunk workshop-garden of brass machines and flowering vines softly blurred behind her. Painterly, luminous, radiant, highly detailed face, clean skin.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
