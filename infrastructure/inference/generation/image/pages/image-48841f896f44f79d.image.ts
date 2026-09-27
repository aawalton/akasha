import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48841f896f44f79d = {
  id: "01a0c5f3-f003-74dc-9b84-560e919e76ef",
  type: "page-type/image",
  slug: "image-48841f896f44f79d",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 352944956,
  resolution: "1460",
  inputImage: "image/image-b1b669f63e54487d",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/garden", "setting-tag/greenhouse", "setting-tag/outdoor"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer", "pose-tag/looking-back"],
  wardrobeTags: ["wardrobe-tag/top", "wardrobe-tag/belt"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
