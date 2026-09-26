import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE4caf8a8fe961e80 = {
  id: "019f1838-8cd7-7d14-849f-9e1421754fe1",
  type: "page-type/image",
  slug: "image-e4caf8a8fe961e80",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a gold dragon in humanoid form: smooth flawless human skin with NO scales on her face or arms, subtle draconic features only — elegant amber-bronze horns sweeping back, radiant golden eyes with vertical slit pupils, long honey-gold hair. She wears gleaming gold-and-bronze metal scale-mail armor: overlapping polished metal scales forming an ornate shoulder cape and chest harness, chainmail rings and fine draping chains, a high scalloped collar. A regal dungeon master at a candlelit table with ornate dice and an open tome, a warm confident knowing smile, looking directly at the viewer, chest-up intimate framing, warm candlelight, shallow depth of field, 85mm, photoreal, natural skin detail",
  seed: 8012,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
