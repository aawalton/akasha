import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d648eeb1bd12c9d = {
  id: "01a0c5f3-f001-72b0-b149-412e50f06594",
  type: "page-type/image",
  slug: "image-1d648eeb1bd12c9d",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1496583879,
  resolution: "1460",
  inputImage: "image/image-f8f9d64aac8b693a",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/library", "setting-tag/study", "setting-tag/indoor"],
  poseTags: [
    "pose-tag/standing",
    "pose-tag/looking-at-viewer",
    "pose-tag/smiling",
    "pose-tag/reaching",
  ],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/glasses"],
} as const satisfies Image
