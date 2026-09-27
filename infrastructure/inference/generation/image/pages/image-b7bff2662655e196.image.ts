import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB7bff2662655e196 = {
  id: "01a0c5f2-eb1f-7136-a9f8-7430d2202dcb",
  type: "page-type/image",
  slug: "image-b7bff2662655e196",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a coffee date, wearing a cozy oversized sweater and jeans, sitting across a small cafe table holding a latte, warm soft smile toward the viewer, golden window light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/cafe", "setting-tag/indoor", "setting-tag/window"],
  poseTags: [
    "pose-tag/sitting",
    "pose-tag/holding-drink",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
  ],
  wardrobeTags: ["wardrobe-tag/sweater", "wardrobe-tag/jeans"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
