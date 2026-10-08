import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC669fd776935a318 = {
  id: "01a0c5f2-eb23-79db-b916-22bd50c33010",
  type: "page-type/image",
  slug: "image-c669fd776935a318",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a Greek goddess, flowing white draped toga with gold accents, laurel crown, marble temple columns, serene divine expression, soft glowing light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/ruins", "setting-tag/outdoor"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer", "pose-tag/portrait"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/belt", "wardrobe-tag/jewelry"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
  createdAt: "2026-09-21T21:50:26.595Z",
  updatedAt: "2026-09-27T15:52:40.000Z",
} as const satisfies Image
