import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7905d479c1ea3fe7 = {
  id: "019f28f7-9e77-7dbb-9286-8c36486975eb",
  type: "page-type/image",
  slug: "image-7905d479c1ea3fe7",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 1596949528,
  resolution: "1460",
  inputImage: "image/image-192db3be8fceb38e",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-2",
  settingTags: [
    "setting-tag/mountains",
    "setting-tag/outdoor",
    "setting-tag/rocks",
    "setting-tag/sunset",
  ],
  poseTags: ["pose-tag/squatting", "pose-tag/reaching", "pose-tag/looking-at-viewer"],
  wardrobeTags: [
    "wardrobe-tag/barefoot",
    "wardrobe-tag/sports-bra",
    "wardrobe-tag/shorts",
    "wardrobe-tag/headband",
  ],
  ethnicityTags: ["ethnicity-tag/white"],
  ageTags: ["age-tag/age-25-34"],
} as const satisfies Image
