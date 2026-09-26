import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDa3ee3d14719c507 = {
  id: "019f1839-3f58-70cc-a009-aaf50072d7f5",
  type: "page-type/image",
  slug: "image-da3ee3d14719c507",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Chest-up portrait of a young woman, Caucasian, warm wavy brown hair, bright blue eyes, a delicate pretty face, looking directly at the viewer making eye contact, a soft subtle gleam of inspiration in her eyes (natural eyes, not glowing). She is a princess and a mechanical engineer in a high-fantasy solarpunk world. She wears the fine delicate cream silk-and-lace underlayer chemise of her princess ball gown — elegant, lace-trimmed, soft and a little revealing, slipping off one shoulder, clearly a princess's elegant underdress and not a peasant shift — cinched at the waist with a simple brown leather engineer's work-belt holding a few tools. Warm golden sunlight, a softly blurred solarpunk workshop-garden of brass machines and flowering vines behind her. Painterly, luminous, highly detailed face, clean skin no smudges.",
  seed: 4303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
