import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7c6702b425ec7722 = {
  id: "01a0c5f4-03a3-7e58-bd82-540853ed65af",
  type: "page-type/image",
  slug: "image-7c6702b425ec7722",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 12345,
  softness: 0.7,
  resolution: "1460",
  inputImage: "image/image-fb5b849a2b11d3c1",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-3",
  settingTags: ["setting-tag/indoor", "setting-tag/studio"],
  poseTags: ["pose-tag/close-up", "pose-tag/looking-at-viewer", "pose-tag/front-view"],
  wardrobeTags: ["wardrobe-tag/top"],
  ethnicityTags: ["ethnicity-tag/asian"],
  ageTags: ["age-tag/age-18-24"],
} as const satisfies Image
