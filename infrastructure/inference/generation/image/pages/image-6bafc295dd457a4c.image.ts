import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6bafc295dd457a4c = {
  id: "01a0c5f3-3621-7f3f-9d92-8a7c3742c99d",
  type: "page-type/image",
  slug: "image-6bafc295dd457a4c",
  persona: "persona/aura",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of an athletic young woman track runner caught mid-motion, glancing back at the camera with a quick confident grin, long ponytail flying in the wind, flushed fair skin with light sheen, bright eyes, modern athletic crop top, motion blur of speed behind her, golden afternoon stadium light, 85mm, shallow depth of field, photorealistic",
  seed: 603,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/outdoor", "setting-tag/sports-field", "setting-tag/field"],
  poseTags: ["pose-tag/running", "pose-tag/looking-back", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/sports-bra", "wardrobe-tag/shorts"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
