import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e13b22384c29b71 = {
  id: "01a0c5f3-b3cb-7201-b25d-12e0ee2c25a2",
  type: "page-type/image",
  slug: "image-7e13b22384c29b71",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a lingerie model in her late twenties standing in a waterfall looking back over her shoulder, drenched, wet lingerie, water droplets on her skin, tropical greenery, warm golden light, editorial glamour 50mm photograph",
  seed: 185894813,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/waterfall", "setting-tag/outdoor", "setting-tag/nature"],
  poseTags: ["pose-tag/looking-back", "pose-tag/profile", "pose-tag/standing"],
  wardrobeTags: ["wardrobe-tag/bikini", "wardrobe-tag/lingerie"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
