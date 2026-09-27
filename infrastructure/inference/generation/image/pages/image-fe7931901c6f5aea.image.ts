import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFe7931901c6f5aea = {
  id: "01a0c5f2-eb1d-768b-9571-dc1c5ce28eee",
  type: "page-type/image",
  slug: "image-fe7931901c6f5aea",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a chic little black cocktail dress at an upscale bar, holding a glass of champagne, warm ambient lighting, elegant relaxed smile, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/restaurant",
    "setting-tag/bar",
    "setting-tag/indoor",
    "setting-tag/night",
  ],
  poseTags: [
    "pose-tag/sitting",
    "pose-tag/holding-drink",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
  ],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/sleeveless"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
