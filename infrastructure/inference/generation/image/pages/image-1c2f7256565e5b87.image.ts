import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c2f7256565e5b87 = {
  id: "019f1838-5df0-7678-90e3-77804419dcee",
  type: "page-type/image",
  slug: "image-1c2f7256565e5b87",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1021531195,
  resolution: "1488",
  inputImage: "image/image-42ff248d287c08d8",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: ["setting-tag/field", "setting-tag/outdoor", "setting-tag/sunset"],
  poseTags: ["pose-tag/looking-at-viewer", "pose-tag/smiling", "pose-tag/portrait"],
  wardrobeTags: ["wardrobe-tag/tank-top", "wardrobe-tag/top"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
  persona: "persona/aine",
} as const satisfies Image
