import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image28ecda25f1e0dd85 = {
  id: "01a0c5f2-eb24-70fa-9d10-346c884458c9",
  type: "page-type/image",
  slug: "image-28ecda25f1e0dd85",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman sitting on a kitchen counter in the morning, bare feet, holding a mug, mid-conversation soft smile, oversized sweater, warm window light, 35mm, candid, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-4",
  settingTags: ["setting-tag/kitchen", "setting-tag/indoor", "setting-tag/daytime"],
  poseTags: ["pose-tag/holding-drink", "pose-tag/looking-at-viewer", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/sweater", "wardrobe-tag/bare-legs"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
