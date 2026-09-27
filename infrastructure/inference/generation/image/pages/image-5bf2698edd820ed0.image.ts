import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5bf2698edd820ed0 = {
  id: "019f2ded-9ea3-7034-860d-f0750de3fe08",
  type: "page-type/image",
  slug: "image-5bf2698edd820ed0",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1922634173,
  resolution: "1460",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-5",
  settingTags: ["setting-tag/library", "setting-tag/indoor", "setting-tag/cabin"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-away", "pose-tag/profile"],
  wardrobeTags: [
    "wardrobe-tag/dress",
    "wardrobe-tag/halter-top",
    "wardrobe-tag/bare-shoulders",
    "wardrobe-tag/glitter-makeup",
  ],
  fantasyTags: ["fantasy-tag/horns", "fantasy-tag/green-hair"],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
  persona: "persona/elin",
} as const satisfies Image
