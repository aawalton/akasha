import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9cf8a2fb9256a834 = {
  id: "019f1839-39e6-7a56-aa16-d98a58ddbe41",
  type: "page-type/image",
  slug: "image-9cf8a2fb9256a834",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Chest-up portrait of a young woman, Caucasian, warm wavy brown hair, natural blue eyes, pretty face, serene and quietly proud, head turned very slightly, looking directly at the viewer with a subtle spark of inspiration in her eyes (natural, not glowing). A princess-engineer in a high-fantasy solarpunk world. Classic cute cream Lolita princess dress, no blue and no metal on the dress, with a brown leather engineer's work-belt and apron over it. Rich warm golden light, a beautiful solarpunk garden-forge of glowing brass and blossoming vines behind her. Painterly, luminous, highly detailed face, clean skin.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
