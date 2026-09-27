import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image271a90df0aa2e0b9 = {
  id: "019f1838-e643-7d58-acf5-f1fe214217a9",
  type: "page-type/image",
  slug: "image-271a90df0aa2e0b9",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 536808492,
  resolution: "1500",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-1",
  settingTags: ["setting-tag/field", "setting-tag/outdoor", "setting-tag/sunset"],
  poseTags: ["pose-tag/profile", "pose-tag/looking-away", "pose-tag/arms-raised"],
} as const satisfies Image
