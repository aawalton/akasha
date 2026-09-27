import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAe0db4b08d986551 = {
  id: "01a0c5f2-eb1d-7163-90cd-2bf217f54bd2",
  type: "page-type/image",
  slug: "image-ae0db4b08d986551",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a flowing emerald green satin gown descending a grand staircase, one hand on the rail, warm dramatic light, elegant expression, 50mm, fine fabric drape, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/hallway", "setting-tag/indoor", "setting-tag/luxury"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-down"],
  wardrobeTags: [
    "wardrobe-tag/dress",
    "wardrobe-tag/silk",
    "wardrobe-tag/deep-v-neck",
    "wardrobe-tag/sleeveless",
  ],
  ethnicityTags: ["ethnicity-tag/mixed"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
