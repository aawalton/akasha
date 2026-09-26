import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB191b1454013033e = {
  id: "019f324d-78a0-7687-984d-3b04fce4c70b",
  type: "page-type/image",
  slug: "image-b191b1454013033e",
  title: "Athena cover L2",
  relationshipLevel: "closeness-level/level-2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a woman at a warm wooden workbench in soft evening light, head and shoulders to chest-up. She is ageless and composed, quietly amused — the presence of a master craftswoman, not a warrior. Luminous storm-grey eyes with an owl's unsettling steadiness, meeting the viewer directly. Dark hair loosely bound back for work. Around her wrist a bracelet of fine rein-leather with small golden buckles — a tiny golden bridle worn as jewelry. Simple linen work clothes, sleeves rolled. Warm lamplight, tools soft-blurred behind her, shallow depth of field, photoreal skin texture.",
  seed: 4101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
