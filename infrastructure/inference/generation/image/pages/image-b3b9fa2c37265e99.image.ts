import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB3b9fa2c37265e99 = {
  id: "01a0c5f2-eb1f-74df-afd0-b320b6b58600",
  type: "page-type/image",
  slug: "image-b3b9fa2c37265e99",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a farmers market date, casual linen shirt and jeans, holding a paper bag of produce, bright cheerful smile toward the viewer, sunny morning light, 35mm, candid, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/market", "setting-tag/daytime"],
  poseTags: ["pose-tag/standing", "pose-tag/smiling", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/shirt", "wardrobe-tag/jeans", "wardrobe-tag/jewelry"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
