import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAe2e080307cf0388 = {
  id: "01a0c5f2-eb22-7afa-98b9-8a64284812d1",
  type: "page-type/image",
  slug: "image-ae2e080307cf0388",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime ninja kunoichi, sleek dark mesh-and-armor outfit, headband, kunai in hand, moonlit rooftop, intense focused expression, cool blue light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/rooftop", "setting-tag/night", "setting-tag/city"],
  poseTags: ["pose-tag/standing", "pose-tag/holding-weapon", "pose-tag/looking-at-viewer"],
  wardrobeTags: [
    "wardrobe-tag/sheer",
    "wardrobe-tag/headband",
    "wardrobe-tag/gloves",
    "wardrobe-tag/belt",
  ],
  fantasyTags: ["fantasy-tag/warrior", "fantasy-tag/superhero"],
  ethnicityTags: ["ethnicity-tag/asian"],
} as const satisfies Image
