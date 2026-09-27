import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD3cba5edaceafbf3 = {
  id: "01a0c5f2-eb20-728f-8abd-fd5f818775b9",
  type: "page-type/image",
  slug: "image-d3cba5edaceafbf3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a cozy rainy-day cafe date, casual sweater, sitting by a rain-streaked window with a warm drink, soft gentle smile toward the viewer, muted soft daylight, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/cafe", "setting-tag/window", "setting-tag/indoor", "setting-tag/rain"],
  poseTags: [
    "pose-tag/sitting",
    "pose-tag/looking-at-viewer",
    "pose-tag/holding-drink",
    "pose-tag/smiling",
  ],
  wardrobeTags: ["wardrobe-tag/sweater", "wardrobe-tag/cardigan", "wardrobe-tag/top"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
