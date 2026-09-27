import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE158c51e492dd34f = {
  id: "019f1838-ff45-7a40-8ddc-3b493fd91c0e",
  type: "page-type/image",
  slug: "image-e158c51e492dd34f",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 829957720,
  resolution: "1440",
  inputImage: "image/image-24731d4ffebdef55",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/garden", "setting-tag/outdoor", "setting-tag/sunset"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer", "pose-tag/smiling"],
  wardrobeTags: ["wardrobe-tag/dress", "wardrobe-tag/sleeveless"],
} as const satisfies Image
