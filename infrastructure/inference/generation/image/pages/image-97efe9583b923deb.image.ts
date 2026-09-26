import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image97efe9583b923deb = {
  id: "019f1839-3850-7714-a126-4c2d59911cd0",
  type: "page-type/image",
  slug: "image-97efe9583b923deb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Chest-up portrait of a young woman, Caucasian, warm wavy brown hair, bright blue eyes, delicate pretty face, looking directly at the viewer with a soft subtle spark in her eyes (natural eyes, not glowing). A princess-engineer in a high-fantasy solarpunk world. Classic cute cream-and-pastel Lolita princess dress, no metal on the dress, with a brown leather work-belt and apron over it. Setting: a bright airy glass-and-iron conservatory workshop full of sunlight, potted blooming plants and polished brass instruments, clean and luminous. Clean face no smudges. Painterly, warm, highly detailed face.",
  seed: 4311,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
