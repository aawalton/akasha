import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7646652ffe0a4838 = {
  id: "01a0c5f2-eb22-7752-9fda-9f23debc46c1",
  type: "page-type/image",
  slug: "image-7646652ffe0a4838",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime battle mage, ornate robe with glowing runes and a staff, swirling magic energy, fantasy ruins backdrop, focused powerful expression, dramatic glowing light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/temple"],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/looking-at-viewer",
    "pose-tag/holding-weapon",
    "pose-tag/casting-magic",
  ],
  wardrobeTags: [
    "wardrobe-tag/armor",
    "wardrobe-tag/gold-trim",
    "wardrobe-tag/long-sleeves",
    "wardrobe-tag/fully-clothed",
  ],
  fantasyTags: ["fantasy-tag/magic", "fantasy-tag/cosplay"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
