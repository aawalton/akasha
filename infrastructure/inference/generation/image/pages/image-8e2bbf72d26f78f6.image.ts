import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8e2bbf72d26f78f6 = {
  id: "019f23ca-54d5-7bb0-8c0e-345643573276",
  type: "page-type/image",
  slug: "image-8e2bbf72d26f78f6",
  service: "mflux-upscale-seedvr2",
  operation: "upscale",
  model: "SeedVR2",
  seed: 228896228,
  softness: 0.45,
  resolution: "1500",
  inputImage: "image/image-7f1633eace5b5e8d",
  serviceVersions: ["mlx 0.31.0"],
  subjects: "F",
  relationshipLevel: "closeness-level/level-6",
  settingTags: ["setting-tag/forest", "setting-tag/dimly-lit"],
  poseTags: ["pose-tag/standing", "pose-tag/looking-at-viewer"],
  wardrobeTags: ["wardrobe-tag/topless", "wardrobe-tag/nude"],
  fantasyTags: ["fantasy-tag/cyberpunk", "fantasy-tag/android", "fantasy-tag/sci-fi"],
} as const satisfies Image
