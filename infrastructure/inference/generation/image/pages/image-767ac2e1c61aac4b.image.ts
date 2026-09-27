import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image767ac2e1c61aac4b = {
  id: "01a0c5f2-eb25-79c3-8cc5-db282c9ddeeb",
  type: "page-type/image",
  slug: "image-767ac2e1c61aac4b",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, sitting on the edge of an unmade bed, wearing just an oversized heather-grey t-shirt slipping off one shoulder, tousled hair, 85mm portrait, soft morning light, shallow depth of field, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-4",
  settingTags: ["setting-tag/bedroom", "setting-tag/indoor"],
  poseTags: ["pose-tag/sitting", "pose-tag/looking-at-viewer", "pose-tag/full-body"],
  wardrobeTags: ["wardrobe-tag/t-shirt", "wardrobe-tag/shorts", "wardrobe-tag/bare-legs"],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
