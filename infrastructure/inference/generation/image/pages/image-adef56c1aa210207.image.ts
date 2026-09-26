import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAdef56c1aa210207 = {
  id: "019f2329-54dd-7fbf-b6fc-e38d642090c8",
  type: "page-type/image",
  slug: "image-adef56c1aa210207",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a woman at a warm wooden workbench in soft evening light, closer crop, head and shoulders. She is ageless and composed, quietly amused — the presence of a master craftswoman, not a warrior. Luminous storm-grey eyes with an owl's unsettling steadiness, meeting the viewer directly. Dark hair loosely bound back for work, a few strands loose. Around her wrist a bracelet of fine rein-leather with small golden buckles — a tiny golden bridle worn as jewelry. Simple linen work clothes, sleeves rolled. She leans forward slightly over the bench, hands loosely clasped, as if she just set down a tool to give you her full attention. Warm lamplight, tools soft-blurred behind her, shallow depth of field, photoreal skin texture.",
  seed: 4101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
